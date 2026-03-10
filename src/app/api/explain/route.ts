import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, language } = await req.json();

  const prompt = `
Explain the following ${language} code in simple terms.

Code:
${code}
`;

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

  const data = await response.json();

  const explanation = data.choices?.[0]?.message?.content || "No explanation.";

  return NextResponse.json({ explanation });
}