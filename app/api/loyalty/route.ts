import { NextResponse } from "next/server";
import { business } from "@/lib/data";
import { upsertMockCustomer } from "@/lib/mock-store";
import { isRateLimited } from "@/lib/rate-limit";
import { getServiceSupabase } from "@/lib/supabase";
import { createReferralCode, isValidRomanianPhone, normalizeRomanianPhone } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  if (isRateLimited(`loyalty:${ip}`, 5)) {
    return NextResponse.json({ ok: false, message: "Prea multe incercari. Incearca din nou intr-un minut." }, { status: 429 });
  }

  const body = (await request.json()) as { name?: string; phone?: string; referral?: string };
  const name = String(body.name || "").trim();
  const phone = normalizeRomanianPhone(String(body.phone || ""));
  const referral = String(body.referral || "").trim() || null;

  if (name.length < 2) {
    return NextResponse.json({ ok: false, message: "Scrie numele complet." }, { status: 400 });
  }

  if (!isValidRomanianPhone(phone)) {
    return NextResponse.json({ ok: false, message: "Telefon invalid. Foloseste format romanesc 07..." }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    const customer = upsertMockCustomer(name, phone, referral);
    return NextResponse.json({
      ok: true,
      message: "MOCK: Ai intrat in SHARO VIP Club. Dupa plata, cere QR-ul secret de stampila la casa.",
      points: customer.totalPoints,
      referralCode: customer.referralCode
    });
  }

  const { data: existing, error: lookupError } = await supabase
    .from("customers")
    .select("id,total_points,total_visits,last_visit_at,referral_code")
    .eq("business_id", business.id)
    .eq("phone", phone)
    .maybeSingle();

  if (lookupError) {
    return NextResponse.json({ ok: false, message: lookupError.message }, { status: 500 });
  }

  const customerId = existing?.id;
  const referralCode = existing?.referral_code || createReferralCode(name);

  if (!customerId) {
    const { data: inserted, error } = await supabase
      .from("customers")
      .insert({
        business_id: business.id,
        name,
        phone,
        referral_code: referralCode,
        referred_by: referral,
        total_points: 0,
        total_visits: 0
      })
      .select("id")
      .single();
    if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  } else {
    const { error } = await supabase
      .from("customers")
      .update({
        name
      })
      .eq("id", customerId);
    if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: "Ai intrat in SHARO VIP Club. Dupa plata, cere QR-ul secret de stampila la casa.",
    points: existing?.total_points || 0,
    referralCode
  });
}
