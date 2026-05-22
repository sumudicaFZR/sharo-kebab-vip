import { NextResponse } from "next/server";
import { business } from "@/lib/data";
import { expirationFromPreset } from "@/lib/rate-limit";
import { getMockStaffEvents, getActiveMockStaffToken, rotateMockStaffToken } from "@/lib/mock-store";
import { getServiceSupabase } from "@/lib/supabase";

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function publicTokenPayload(token: { id: string; token: string; active: boolean; expires_at?: string | null; expiresAt?: number | null; created_at?: string; createdAt?: number }) {
  const expiresAt = "expires_at" in token ? token.expires_at : token.expiresAt ? new Date(token.expiresAt).toISOString() : null;
  const createdAt = "created_at" in token ? token.created_at : token.createdAt ? new Date(token.createdAt).toISOString() : null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    id: token.id,
    token: token.token,
    active: token.active,
    expires_at: expiresAt,
    created_at: createdAt,
    url: `${baseUrl.replace(/\/$/, "")}/sharo-kebab/stamp?token=${token.token}`
  };
}

export async function GET() {
  const supabase = getServiceSupabase();
  if (!supabase) {
    const token = getActiveMockStaffToken() || rotateMockStaffToken(null);
    return NextResponse.json({ ok: true, token: publicTokenPayload(token), events: getMockStaffEvents() });
  }

  const { data: token, error } = await supabase
    .from("staff_qr_tokens")
    .select("id,token,active,expires_at,created_at")
    .eq("business_id", business.id)
    .eq("active", true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

  const { data: events } = await supabase
    .from("stamp_events")
    .select("id,customer_id,source,token_id,created_at,metadata")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return NextResponse.json({ ok: true, token: token ? publicTokenPayload(token) : null, events: events || [] });
}

export async function POST(request: Request) {
  const { expiration = "weekly" } = (await request.json().catch(() => ({}))) as { expiration?: string };
  const expiresAtMs = expirationFromPreset(expiration);
  const supabase = getServiceSupabase();

  if (!supabase) {
    const token = rotateMockStaffToken(expiresAtMs);
    return NextResponse.json({ ok: true, token: publicTokenPayload(token) });
  }

  await supabase.from("staff_qr_tokens").update({ active: false }).eq("business_id", business.id).eq("active", true);
  const { data, error } = await supabase
    .from("staff_qr_tokens")
    .insert({
      business_id: business.id,
      token: randomToken(),
      active: true,
      expires_at: expiresAtMs ? new Date(expiresAtMs).toISOString() : null,
      created_by: process.env.SHARO_ADMIN_EMAIL || "admin@sharokebab.ro"
    })
    .select("id,token,active,expires_at,created_at")
    .single();

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, token: publicTokenPayload(data) });
}
