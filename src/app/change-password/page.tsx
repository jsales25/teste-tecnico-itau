"use client";

import Image from "next/image";
import { useState } from "react";
import WorldIcon from "@/assets/world-icon.png";
import CloseIcon from "@/assets/close-icon.png";
import OpenEyeIcon from "@/assets/open-eye-icon.png";
import CloseEyeIcon from "@/assets/close-eye-icon.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordForm } from "@/schemas/auth";

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  const onSubmit = (data: ChangePasswordForm) => {
    // dados válidos (envie para a API aqui)
    console.log("Senha alterada:", data);
  };

  return (
    <div className="flex h-screen">
      <aside className="bg-[#030204] flex-1 px-9 py-9 overflow-hidden">
        <div>
          <h2 className="bg-white text-[18px] text-black h-10 w-10 rounded-[7px] flex justify-center items-end font-bold">
            itaú
          </h2>
        </div>

        <div className="flex justify-center items-center h-full">
          <div className="absolute w-96 h-96 bg-[#FF6202]/50 rounded-full blur-[120px]" />
          <div className="relative w-40 h-40 bg-black rounded-xl border border-[#FF6202]/50" />
        </div>
      </aside>

      <main className="bg-white flex-1 p-9 text-black flex flex-col min-h-0">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image src={WorldIcon} alt="Ícone mundo" className="h-5 w-5" />
            <p>BR</p>
          </div>

          <div className="flex gap-2 items-center">
            <Image src={CloseIcon} alt="Ícone fechar" className="h-5 w-5" />
            <p>Close</p>
          </div>
        </div>

        <div className="mt-10 max-w-md flex-1 min-h-0 overflow-y-auto">
          <h1 className="text-3xl font-semibold mb-8">Altere sua senha</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <label className="flex flex-col relative">
              <span className="text-sm text-gray-600 mb-2">Senha atual</span>
              <div className="flex items-center">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...register("currentPassword")}
                  className="flex-1 border-b border-gray-300 py-2 bg-transparent outline-none"
                  placeholder="Senha atual"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((v) => !v)}
                  className="ml-3 text-sm text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? (
                    <Image
                      src={CloseEyeIcon}
                      alt="Ícone olho fechado"
                      className="h-5 w-5 cursor-pointer"
                    />
                  ) : (
                    <Image
                      src={OpenEyeIcon}
                      alt="Ícone olho aberto"
                      className="h-5 w-5 cursor-pointer"
                    />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </label>

            <label className="flex flex-col relative">
              <span className="text-sm text-gray-600 mb-2">Senha nova</span>
              <div className="flex items-center">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword")}
                  className="flex-1 border-b border-gray-300 py-2 bg-transparent outline-none"
                  placeholder="Senha nova"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((v) => !v)}
                  className="ml-3 text-sm text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <Image
                      src={CloseEyeIcon}
                      alt="Ícone olho fechado"
                      className="h-5 w-5 cursor-pointer"
                    />
                  ) : (
                    <Image
                      src={OpenEyeIcon}
                      alt="Ícone olho aberto"
                      className="h-5 w-5 cursor-pointer"
                    />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </label>

            <a href="/sign-in" className="text-sm text-blue-700">
              Fazer login
            </a>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`h-12 w-28 mt-4 mb-6 py-3 rounded-md transition ${
                isValid
                  ? "bg-[#FF6202] hover:bg-[#ff6302e3] cursor-pointer text-white"
                  : "bg-gray-300 text-gray-600"
              } disabled:opacity-50`}
            >
              Salvar
            </button>
          </form>
        </div>
        <footer className="text-sm text-gray-500 mt-auto">
          2023 - Itaú Private Bank. All rights reserved. Privacy Policy
        </footer>
      </main>
    </div>
  );
}
