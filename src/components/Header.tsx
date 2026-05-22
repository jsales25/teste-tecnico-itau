"use client";

import { useState } from "react";
import Image from "next/image";
import PlusIcon from "@/assets/plus-icon.png";
import CreateProductModal from "@/components/CreateProductModal";

type HeaderProps = {
  total: number;
  onProductCreated?: () => void;
};

export default function Header({ total, onProductCreated }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (product: { name: string; code: string }) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: product.name,
          price: 0, // Como seu modal não tem preço, enviamos 0 ou um padrão
          description: product.code // Usando código como descrição para exemplo
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar produto");

      setIsOpen(false);
      if (onProductCreated) onProductCreated();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar produto");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-white">
          {total} produtos criados
        </h2>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 cursor-pointer"
        >
          <Image src={PlusIcon} alt="Ícone mais" />
          <span>Criar</span>
        </button>
      </div>

      <CreateProductModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
