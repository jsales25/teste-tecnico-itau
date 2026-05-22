import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta-padrao-de-teste";

export interface TokenPayload {
  userId: string;
  email: string;
}

/**
 * Helper para validar o token JWT nas rotas da API.
 * Ele verifica o cabeçalho 'Authorization' e retorna o payload do token.
 */
export async function getAuthSession(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}
