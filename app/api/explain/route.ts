import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "AI explanation is not configured. Set OPENAI_API_KEY in your environment." },
      { status: 503 }
    );
  }

  const { code, language } = await req.json();

  const prompt = `
Explain the following ${language} code in simple terms.

Code:
${code}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to generate explanation." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const explanation = data.choices?.[0]?.message?.content || "No explanation.";

    return NextResponse.json({ explanation });
  } catch {
    return NextResponse.json({ error: "Failed to generate explanation." }, { status: 500 });
  }
}
