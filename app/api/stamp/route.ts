import { NextResponse } from "next/server";
import { business } from "@/lib/data";
import { getMockStore, logMockStampEvent, validateMockStaffToken } from "@/lib/mock-store";
import { cooldownHoursRemaining, isRateLimited, SIX_HOURS_MS } from "@/lib/rate-limit";
import { getServiceSupabase } from "@/lib/supabase";
import { isValidRomanianPhone, normalizeRomanianPhone } from "@/lib/validation";

function invalidTokenResponse(reason = "invalid") {
  return NextResponse.json(
    {
      ok: false,
      code: "invalid_token",
      reason,
      message: "QR invalid sau expirat. Cere personalului un QR valid."
    },
    { status: 403 }
  );
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (isRateLimited(`stamp:${ip}`, 10)) {
    return NextResponse.json({ ok: false, code: "rate_limited", message: "Prea multe incercari. Incearca din nou intr-un minut." }, { status: 429 });
  }

  const body = (await request.json()) as { token?: string; phone?: string };
  const token = String(body.token || "").trim();
  const phone = normalizeRomanianPhone(String(body.phone || ""));

  if (!token) return invalidTokenResponse("missing");
  if (!isValidRomanianPhone(phone)) {
    return NextResponse.json({ ok: false, code: "phone_required", message: "Scrie un numar de telefon romanesc valid." }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    const validation = validateMockStaffToken(token);
    if (!validation.ok) {
      logMockStampEvent({ customerId: null, phone, tokenId: validation.token?.id || null, ok: false, reason: validation.reason });
      return invalidTokenResponse(validation.reason);
    }

    const store = getMockStore();
    const customer = store.customers.get(phone);
    if (!customer) {
      logMockStampEvent({ customerId: null, phone, tokenId: validation.token.id, ok: false, reason: "customer_not_found" });
      return NextResponse.json({ ok: false, code: "customer_not_found", message: "Telefonul nu este in VIP Club. Intra mai intai in club." }, { status: 404 });
    }

    if (customer.lastStampAt && Date.now() - customer.lastStampAt < SIX_HOURS_MS) {
      const hours = cooldownHoursRemaining(customer.lastStampAt);
      logMockStampEvent({ customerId: customer.id, phone, tokenId: validation.token.id, ok: false, reason: "cooldown" });
      return NextResponse.json({
        ok: false,
        code: "cooldown",
        hoursRemaining: hours,
        message: `Ai primit deja o stampila recent. Poti primi urmatoarea peste ${hours} ore.`
      });
    }

    customer.totalPoints += 1;
    customer.totalVisits += 1;
    customer.lastStampAt = Date.now();
    logMockStampEvent({ customerId: customer.id, phone, tokenId: validation.token.id, ok: true, reason: "added" });
    return NextResponse.json({
      ok: true,
      message: "Stampila adaugata 🔥",
      points: customer.totalPoints,
      visits: customer.totalVisits,
      rewardMessage:
        customer.totalPoints >= 10
          ? "Arata acest ecran la casa pentru reward-ul SHARO."
          : customer.totalPoints >= 5
            ? "Arata acest ecran la casa pentru reward."
            : null
    });
  }

  const { data: staffToken, error: tokenError } = await supabase
    .from("staff_qr_tokens")
    .select("id,active,expires_at")
    .eq("business_id", business.id)
    .eq("token", token)
    .maybeSingle();

  if (tokenError) return NextResponse.json({ ok: false, message: tokenError.message }, { status: 500 });
  if (!staffToken || !staffToken.active || (staffToken.expires_at && new Date(staffToken.expires_at).getTime() <= Date.now())) {
    await supabase.from("stamp_events").insert({
      business_id: business.id,
      customer_id: null,
      source: "secret_staff_qr",
      token_id: staffToken?.id || null,
      metadata: { ok: false, reason: !staffToken ? "invalid" : staffToken.active ? "expired" : "inactive", phone }
    });
    return invalidTokenResponse(!staffToken ? "invalid" : staffToken.active ? "expired" : "inactive");
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("id,total_points,total_visits,last_visit_at")
    .eq("business_id", business.id)
    .eq("phone", phone)
    .maybeSingle();

  if (customerError) return NextResponse.json({ ok: false, message: customerError.message }, { status: 500 });
  if (!customer) {
    await supabase.from("stamp_events").insert({
      business_id: business.id,
      customer_id: null,
      source: "secret_staff_qr",
      token_id: staffToken.id,
      metadata: { ok: false, reason: "customer_not_found", phone }
    });
    return NextResponse.json({ ok: false, code: "customer_not_found", message: "Telefonul nu este in VIP Club. Intra mai intai in club." }, { status: 404 });
  }

  if (customer.last_visit_at && Date.now() - new Date(customer.last_visit_at).getTime() < SIX_HOURS_MS) {
    const hours = cooldownHoursRemaining(customer.last_visit_at);
    await supabase.from("stamp_events").insert({
      business_id: business.id,
      customer_id: customer.id,
      source: "secret_staff_qr",
      token_id: staffToken.id,
      metadata: { ok: false, reason: "cooldown", phone }
    });
    return NextResponse.json({ ok: false, code: "cooldown", hoursRemaining: hours, message: `Ai primit deja o stampila recent. Poti primi urmatoarea peste ${hours} ore.` });
  }

  const nextPoints = Number(customer.total_points) + 1;
  const nextVisits = Number(customer.total_visits) + 1;
  const now = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("customers")
    .update({ total_points: nextPoints, total_visits: nextVisits, last_visit_at: now })
    .eq("id", customer.id);
  if (updateError) return NextResponse.json({ ok: false, message: updateError.message }, { status: 500 });

  await supabase.from("visits").insert({ business_id: business.id, customer_id: customer.id, points_added: 1, source: "secret_staff_qr" });
  await supabase.from("stamp_events").insert({
    business_id: business.id,
    customer_id: customer.id,
    source: "secret_staff_qr",
    token_id: staffToken.id,
    metadata: { ok: true, phone }
  });

  return NextResponse.json({
    ok: true,
    message: "Stampila adaugata 🔥",
    points: nextPoints,
    visits: nextVisits,
    rewardMessage: nextPoints >= 10 ? "Arata acest ecran la casa pentru reward-ul SHARO." : nextPoints >= 5 ? "Arata acest ecran la casa pentru reward." : null
  });
}
