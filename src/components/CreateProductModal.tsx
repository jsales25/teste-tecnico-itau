"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import CloseIconModal from "@/assets/close-icon-modal.png";

const createProductSchema = z.object({
  name: z.string().nonempty("O nome do produto é obrigatório"),
  code: z.string().nonempty("O código do produto é obrigatório"),
});

type CreateProductForm = z.infer<typeof createProductSchema>;

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema),
    mode: "onChange",
  });

  if (!open) {
    return null;
  }

  const onSubmit = (data: CreateProductForm) => {
    onSave(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#090909] p-8 text-white shadow-2xl">
        <div className="flex justify-end gap-4">
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
          Criar novo produto
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
              <span>Código do produto</span>
              <input
                {...register("code")}
                placeholder="Insira o código do produto"
                className={`w-full rounded-md border ${errors.code ? "border-red-500" : "border-white/50"} bg-[#090909] px-4 py-2 text-white outline-none transition duration-150 placeholder:text-zinc-500 focus:border-[#FF6202]`}
              />
              {errors.code && (
                <span className="text-xs text-red-500">{errors.code.message}</span>
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
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
