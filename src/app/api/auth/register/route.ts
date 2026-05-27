import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(7, "Nome deve ter pelo menos 7 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password } = registerSchema.parse(body);

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        products: {
          create: [
            { name: "Login", price: 0 },
            { name: "Pix", price: 0 },
            { name: "Crédito", price: 0 },
            { name: "Cartões", price: 0 },
          ]
        }
      },
    });

    return NextResponse.json(
      { message: "Usuário criado com sucesso!", userId: user.id },
      { status: 201 }
    );
  } catch (error) {

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Erro no registro:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
