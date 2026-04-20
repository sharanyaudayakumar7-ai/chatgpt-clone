import OpenAI from "openai";
import type { ChatMessage } from "@/types/chat";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // required by OpenRouter
    "X-Title": "ChatGPT Clone", // optional but recommended
  },
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

    // 🔥 OpenRouter call
    const completion = await client.chat.completions.create({
     model: "meta-llama/llama-3-8b-instruct", // ✅ FREE model
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const answer = completion.choices[0]?.message;

    let content: string;

    if (!answer) {
      content = "Sorry da, no response received.";
    } else if (typeof answer.content === "string") {
      content = answer.content;
    } else if (Array.isArray(answer.content)) {
      content = (answer.content as any[])
        .map((part: any) => {
          if (typeof part === "string") return part;
          if (typeof part.text === "string") return part.text;
          if (part.type === "text" && typeof part.text?.value === "string") {
            return part.text.value;
          }
          return "";
        })
        .join("");

      if (!content.trim()) {
        content = "Got a weird response format 😅";
      }
    } else {
      content = "Couldn't understand the response 😭";
    }

    const reply: ChatMessage = {
      role: "assistant",
      content,
    };

    return Response.json({ reply });
  } catch (err: any) {
    console.error("OPENROUTER ERROR:", err);

    const reply: ChatMessage = {
      role: "assistant",
      content: "Oops da, something went wrong 😭",
    };

    return Response.json({ reply }, { status: 500 });
  }
}