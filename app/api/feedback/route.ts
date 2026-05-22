import { NextResponse } from "next/server";
import { business } from "@/lib/data";
import { getServiceSupabase } from "@/lib/supabase";
import { isValidRomanianPhone, normalizeRomanianPhone } from "@/lib/validation";

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string; phone?: string; rating?: string; message?: string };
  const phone = normalizeRomanianPhone(String(body.phone || ""));

  if (!isValidRomanianPhone(phone)) {
    return NextResponse.json({ ok: false, message: "Telefon invalid." }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (supabase) {
    await supabase.from("private_feedback").insert({
      business_id: business.id,
      name: String(body.name || "").trim(),
      phone,
      rating: Number(body.rating || 5),
      message: String(body.message || "").trim()
    });
  }

  return NextResponse.json({ ok: true });
}
