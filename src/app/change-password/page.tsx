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
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    setError(null);
    setSuccess(null);
    
    try {
      // 1. Pegamos o token do localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Você precisa estar logado para alterar a senha.");
      }

      // 2. Chamamos a API enviando o token no Header
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao alterar senha");
      }

      setSuccess("Senha alterada com sucesso!");
      
      // Opcional: Redirecionar após alguns segundos ou limpar o formulário
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    }
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
        <div className="flex justify-between items-center ">
          
          <div className="flex gap-2 items-center">
            <Image src={WorldIcon} alt="Ícone mundo" className="h-5 w-5" />
            <p>BR</p>
          </div>

          <Link href="/produtos" className="flex gap-2 items-center">
            <Image src={CloseIcon} alt="Ícone fechar" className="h-5 w-5" />
            <p>Close</p>
          </Link>

        </div>

        <div className="mt-10 max-w-md flex-1 min-h-0 overflow-y-auto">
          <h1 className="text-3xl mb-8">Altere sua senha</h1>

          {error && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </p>
          )}

          {success && (
            <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">
              {success}
            </p>
          )}

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

            <Link href="/sign-in" className="text-sm text-blue-900 font-semibold underline">
              Fazer login
            </Link>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`h-12 w-28 mt-4 mb-6 py-3 rounded-md transition ${
                isValid
                  ? "bg-[#FF6202] hover:bg-[#ff6302e3] cursor-pointer text-white"
                  : "bg-gray-300 text-gray-600"
              } disabled:opacity-50`}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
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
