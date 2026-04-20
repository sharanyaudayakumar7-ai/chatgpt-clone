"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hey da 👋 I'm your mini ChatGPT clone. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const sendMessage = async () => {
    if (!input.trim() || isSending) return;

    const newMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    const nextMessages = [...messages, newMessage];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, data.reply as ChatMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops da, something went wrong 😭",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col">
      
      <header className="border-b border-neutral-800 px-4 py-3">
        <h1 className="text-lg font-semibold">ChatGPT Clone 🤖</h1>
        <p className="text-xs text-neutral-400">
          Free AI powered by OpenRouter 🚀
        </p>
      </header>

      <main className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                m.role === "user"
                  ? "bg-emerald-600 text-white"
                  : "bg-neutral-800 text-neutral-100"
              }`}
            >
              {m.role === "assistant" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.content}
                </ReactMarkdown>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}

        {isSending && (
          <div className="text-neutral-400 text-sm">Thinking…</div>
        )}

        <div ref={bottomRef} />
      </main>

      <footer className="border-t border-neutral-800 p-3 flex gap-2">
        <textarea
          rows={2}
          className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-sm outline-none resize-none"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          onClick={sendMessage}
          disabled={isSending || !input.trim()}
          className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </footer>
    </div>
  );
}