"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import CloseIconModal from "@/assets/close-icon-modal.png";

const editProductSchema = z.object({
  name: z.string().nonempty("O nome do produto é obrigatório"),
  description: z.string().nonempty("A descrição/código é obrigatória"),
});

type EditProductForm = z.infer<typeof editProductSchema>;

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EditProductForm>({
    resolver: zodResolver(editProductSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  useEffect(() => {
    if (open) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  if (!open) {
    return null;
  }

  const onSubmit = (data: EditProductForm) => {
    onSave(data);
    onClose();
  };

  const handleClose = () => {
    reset(initialData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#090909] p-8 text-white shadow-2xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClose}
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
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 w-md">
            <label className="flex flex-col gap-2 text-sm text-zinc-300">
              <span>Nome do produto</span>
              <input
                {...register("name")}
                placeholder="Insira o nome do produto"
                className={`w-full rounded-md border ${errors.name ? "border-red-500" : "border-white/50"} bg-[#090909] px-4 py-2 text-white outline-none transition duration-150 placeholder:text-zinc-500 focus:border-[#FF6202]`}
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name.message}</span>
              )}
            </label>

            <label className="flex flex-col gap-2 text-sm text-zinc-300">
              <span>Código/Descrição</span>
              <input
                {...register("description")}
                placeholder="Insira a descrição do produto"
                className={`w-full rounded-md border ${errors.description ? "border-red-500" : "border-white/50"} bg-[#090909] px-4 py-2 text-white outline-none transition duration-150 placeholder:text-zinc-500 focus:border-[#FF6202]`}
              />
              {errors.description && (
                <span className="text-xs text-red-500">{errors.description.message}</span>
              )}
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md border border-white/10 bg-[#646865] py-2 text-sm text-white transition hover:bg-white/30 cursor-pointer w-full"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className={`rounded-md py-2 text-sm text-white transition w-full ${isValid ? "bg-[#FF6202] hover:bg-[#ff7a18] cursor-pointer" : "bg-gray-600 cursor-not-allowed"}`}
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
