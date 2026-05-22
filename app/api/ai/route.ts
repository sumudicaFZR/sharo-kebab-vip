import { NextResponse } from "next/server";
import { business } from "@/lib/data";
import { getServiceSupabase } from "@/lib/supabase";

function mockResponse(prompt: string) {
  return [
    "1. Instagram: Cheese Kebab-ul SHARO vine cu branza topita, sos intens si vibe de Bucuresti dupa program. Azi il iei fierbinte de pe Pache Protopopescu 101.",
    "2. WhatsApp: Salut! Azi la SHARO KEBAB avem oferta pentru Cheese Pui. Raspunde cu COMAND si iti pregatim rapid.",
    "3. TikTok hook: Cand branza se intinde mai mult decat pauza de pranz.",
    "4. Idee promo: Luni-marti 14:00-17:00, cumperi 2 Arabesti si primesti Ayran.",
    `Prompt primit: ${prompt}`
  ].join("\n\n");
}

export async function POST(request: Request) {
  const { prompt, type } = (await request.json()) as { prompt?: string; type?: string };
  const cleanPrompt = String(prompt || "").trim();
  if (!cleanPrompt) {
    return NextResponse.json({ response: "Scrie un prompt pentru AI.", mode: "mock" }, { status: 400 });
  }

  let response = "";
  let mode = "mock";

  if (process.env.OPENAI_API_KEY) {
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Esti AI Marketing Assistant pentru SHARO KEBAB din Bucuresti. Scrie in romana, premium, direct, fara promisiuni false. Include idei pentru kebab/shaorma, Google reviews, WhatsApp, Instagram si TikTok cand e relevant."
          },
          { role: "user", content: cleanPrompt }
        ],
        temperature: 0.8,
        max_tokens: 900
      })
    });

    if (openaiResponse.ok) {
      const data = await openaiResponse.json();
      response = data.choices?.[0]?.message?.content || "";
      mode = "real";
    } else {
      response = mockResponse(cleanPrompt);
    }
  } else {
    response = mockResponse(cleanPrompt);
  }

  const supabase = getServiceSupabase();
  if (supabase) {
    await supabase.from("ai_generations").insert({
      business_id: business.id,
      prompt: cleanPrompt,
      response,
      type: type || "marketing"
    });
  }

  return NextResponse.json({ response, mode });
}
