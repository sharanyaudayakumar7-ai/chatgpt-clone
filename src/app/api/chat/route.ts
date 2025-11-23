import OpenAI from "openai";
import type { ChatMessage } from "@/types/chat";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages as ChatMessage[] | undefined;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages must be an array" }),
        { status: 400 }
      );
    }

    // --- Call OpenAI ---
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini", // you can change this later
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const answer = completion.choices[0]?.message;

    let content: string;

    if (!answer) {
      content = "Sorry da, the model didn't send any answer.";
    } else if (typeof answer.content === "string") {
      // Simple string content
      content = answer.content;
    } else if (Array.isArray(answer.content)) {
      // Content is an array of parts (text, images, etc.)
      content = (answer.content as any[])
        .map((part: any) => {
          // most common case: { type: "text", text: "..." }
          if (typeof part === "string") return part;
          if (typeof part.text === "string") return part.text;
          if (part.type === "text" && typeof part.text?.value === "string") {
            return part.text.value;
          }
          return "";
        })
        .join("");

      if (!content.trim()) {
        content =
          "Sorry da, I got a weird formatted answer from OpenAI and couldn't read it properly.";
      }
    } else {
      content = "Sorry da, I couldn't understand the response from OpenAI.";
    }

    const reply: ChatMessage = {
      role: "assistant",
      content,
    };

    return Response.json({ reply });
  } catch (err: any) {
    console.error("OPENAI ERROR:", err);

    // Handle quota / billing error nicely
    if (err?.status === 429 || err?.code === "insufficient_quota") {
      const reply: ChatMessage = {
        role: "assistant",
        content:
          "Ayyo da 😅 Your OpenAI quota is finished! Add billing or wait for credits to refresh, then I'll answer for real.",
      };
      return Response.json({ reply });
    }

    const reply: ChatMessage = {
      role: "assistant",
      content: "Oops da, something went wrong talking to OpenAI 😭",
    };

    return Response.json({ reply }, { status: 500 });
  }
}
