"use client";

import { useState } from "react";
import Image from "next/image";
import PlusIcon from "@/assets/plus-icon.png";
import CreateProductModal from "@/components/CreateProductModal";

type HeaderProps = {
  total: number;
};

export default function Header({ total }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (product: { name: string; code: string }) => {
    console.log("Produto salvo:", product);
    setIsOpen(false);
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
