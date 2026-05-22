"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import CloseIcon from "@/assets/close-icon.png";
import CloseIconModal from "@/assets/close-icon-modal.png";

type CreateProductModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (product: { name: string; code: string }) => void;
};

export default function CreateProductModal({
  open,
  onClose,
  onSave,
}: CreateProductModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  if (!open) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !code.trim()) {
      return;
    }

    onSave({ name: name.trim(), code: code.trim() });
    setName("");
    setCode("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#090909] p-8 text-white shadow-2xl">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            <Image
              src={CloseIconModal}
              alt="Fechar modal"
              className="h-5 w-5 cursor-pointer"
            />
          </button>
        </div>

        <h3 className="text-xl font-semibold flex justify-center">
          Criar novo produto
        </h3>

        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 w-md">
          <label className="flex flex-col gap-2 text-sm text-zinc-300">
            <span>Nome do produto</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Insira o nome do produto"
              className="w-full rounded-md border border-white/50 bg-[#090909] px-4 py-2 text-white outline-none transition duration-150 placeholder:text-zinc-500 focus:border-[#FF6202]"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-zinc-300">
            <span>Código do produto</span>
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Insira o código do produto"
              className="w-full rounded-md border border-white/50 bg-[#090909] px-4 py-2 text-white outline-none transition duration-150 placeholder:text-zinc-500 focus:border-[#FF6202] mb-12"
            />
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-white/10 bg-[#646865] py-2 text-sm text-white transition hover:bg-white/30 cursor-pointer w-full"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#FF6202] py-2 text-sm text-white transition hover:bg-[#ff7a18] cursor-pointer w-full"
            >
              Salvar
            </button>
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
}
