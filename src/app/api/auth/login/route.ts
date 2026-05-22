import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { cookies } from "next/headers";

// 1. Esquema de validação para o login
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 2. Valida os dados de entrada
    const { email, password } = loginSchema.parse(body);

    // 3. Busca o usuário no banco pelo e-mail
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 4. Se o usuário não existir, retornamos erro
    if (!user) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    // 5. Comparamos a senha enviada com a senha (hash) do banco
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    // 6. Criamos o Token JWT
    const secret = process.env.JWT_SECRET || "chave-secreta-padrao-de-teste";
    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: "1d" }
    );

    // 7. Salvamos o token nos cookies para o Middleware conseguir ler
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    });

    // 8. Retornamos o token e os dados básicos do usuário
    return NextResponse.json({
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
