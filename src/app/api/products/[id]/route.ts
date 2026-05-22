import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

const updateProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  description: z.string().optional(),
  price: z.number().min(0, "Preço deve ser positivo").optional(),
});

// PATCH: Atualizar um produto
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession(request);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await (params as any); // Next.js 15+ requer await no params em alguns contextos
    const body = await request.json();
    const data = updateProductSchema.parse(body);

    // 1. Verificamos se o produto existe e pertence ao usuário
    const product = await prisma.product.findFirst({
      where: {
        id: id,
        userId: session.userId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado ou não pertence a você" },
        { status: 404 }
      );
    }

    // 2. Atualizamos o produto
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: data,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

// DELETE: Deletar um produto
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession(request);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await (params as any);

    // Verificamos se o produto pertence ao usuário antes de deletar
    const product = await prisma.product.findFirst({
      where: {
        id: id,
        userId: session.userId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado ou não pertence a você" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar produto" }, { status: 500 });
  }
}
