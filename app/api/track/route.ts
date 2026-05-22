import { NextResponse } from "next/server";
import { business } from "@/lib/data";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") || "qr_scan";
  const to = url.searchParams.get("to") || "/sharo-kebab";
  const supabase = getServiceSupabase();

  if (supabase) {
    if (type === "review_click") {
      await supabase.from("review_clicks").insert({ business_id: business.id });
    } else if (type === "whatsapp_click") {
      await supabase.from("whatsapp_clicks").insert({ business_id: business.id });
    } else {
      await supabase.from("qr_scans").insert({ business_id: business.id, qr_type: type, device: request.headers.get("user-agent") || "unknown" });
    }
  }

  return NextResponse.redirect(to);
}
