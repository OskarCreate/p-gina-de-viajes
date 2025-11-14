export type UserRole = "usuario" | "cliente" | "empleado" | "administrador";

export interface ChatOptions {
  userRole?: UserRole;
  userId?: number;
  userName?: string;
}

export interface ChatResponse {
  reply: string;
}

const AGENT_BASE_URL = "http://127.0.0.1:8000"; // Ajusta el puerto si tu FastAPI corre en otro

export async function sendMessageToAgent(
  message: string,
  opts: ChatOptions = {},
): Promise<ChatResponse> {
  const res = await fetch(`${AGENT_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      user_role: opts.userRole ?? "cliente",
      user_id: opts.userId ?? 1,
      user_name: opts.userName ?? "Visitante",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error del agente (${res.status}): ${text}`);
  }

  const data = (await res.json()) as ChatResponse;
  return data;
}