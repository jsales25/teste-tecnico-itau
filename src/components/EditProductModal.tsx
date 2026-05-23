"use client";

import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import CloseIconModal from "@/assets/close-icon-modal.png";

type EditProductModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (product: { name: string; description: string }) => void;
  initialData: {
    name: string;
    description: string;
  };
};

export default function EditProductModal({
  open,
  onClose,
  onSave,
  initialData,
}: EditProductModalProps) {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);

  useEffect(() => {
    if (open) {
      setName(initialData.name);
      setDescription(initialData.description);
    }
  }, [open, initialData]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !description.trim()) {
      return;
    }

    onSave({ name: name.trim(), description: description.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#090909] p-8 text-white shadow-2xl">
        <div className="flex justify-end">
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
          Editar produto
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
              <span>Código/Descrição</span>
              <input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Insira a descrição do produto"
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
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
