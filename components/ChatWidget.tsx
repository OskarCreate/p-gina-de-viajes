import { useState } from "react";
import { sendMessageToAgent } from "../agentClient";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  userName?: string | null;
}

export function ChatWidget({ userName }: ChatWidgetProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await sendMessageToAgent(text, {
        userRole: "cliente",
        userId: 1,
        userName: userName ?? undefined,
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hubo un error al hablar con el asistente. " +
            (err?.message || "Revisa que el servidor del agente esté encendido."),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 max-w-full bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col overflow-hidden z-50">
      <div className="bg-red-600 text-white px-3 py-2 text-sm font-semibold">
        Galleta, tu asistente de viajes
      </div>
      <div className="flex-1 max-h-64 overflow-y-auto px-3 py-2 text-sm space-y-1">
        {messages.length === 0 && (
          <p className="text-gray-500 text-xs">
            Escribe tu pregunta sobre viajes o cualquier tema y Galleta te responderá.
          </p>
        )}
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={
              m.role === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }
          >
            <span
              className={
                m.role === "user"
                  ? "bg-blue-500 text-white rounded-lg px-2 py-1 text-xs max-w-[80%]"
                  : "bg-gray-100 text-gray-800 rounded-lg px-2 py-1 text-xs max-w-[80%]"
              }
            >
              {m.content}
            </span>
          </div>
        ))}
        {loading && (
          <p className="text-gray-400 text-xs mt-1">Galleta está escribiendo...</p>
        )}
      </div>
      <div className="border-t px-2 py-1 flex items-center gap-2">
        <input
          className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"
          placeholder="Pregúntale algo a Galleta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={loading}
          className="bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}