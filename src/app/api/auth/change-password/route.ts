import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

// 1. Esquema de validação para a troca de senha
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual é obrigatória"),
  newPassword: z.string().min(8, "A nova senha deve ter pelo menos 8 caracteres"),
});

export async function POST(request: Request) {
  try {
    // 2. Verifica se o usuário está autenticado
    const session = await getAuthSession(request);

    if (!session) {
      return NextResponse.json(
        { error: "Não autorizado. Faça login para alterar sua senha." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // 3. Valida os dados de entrada
    const { currentPassword, newPassword } = changePasswordSchema.parse(body);

    // 4. Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    // 5. Verifica se a senha atual está correta
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "A senha atual está incorreta." },
        { status: 400 }
      );
    }

    // 6. Criptografa a nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 7. Atualiza a senha no banco de dados
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({
      message: "Senha alterada com sucesso!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Erro ao alterar senha:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
