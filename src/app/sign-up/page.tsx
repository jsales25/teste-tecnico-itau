"use client";

import Image from "next/image";
import { useState } from "react";
import WorldIcon from "@/assets/world-icon.png";
import CloseIcon from "@/assets/close-icon.png";
import OpenEyeIcon from "@/assets/open-eye-icon.png";
import CloseEyeIcon from "@/assets/close-eye-icon.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "@/schemas/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useToast } from "@/components/ToastContext";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post("/api/auth/register", data);
      
      showToast("Conta criada com sucesso!", "success");

      // Se deu certo, redireciona para o login
      router.push("/sign-in");
    } catch (err: any) {
      showToast(err.message, "error");
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
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image src={WorldIcon} alt="Ícone mundo" className="h-5 w-5" />
            <p>BR</p>
          </div>

          <Link href="/sign-in" className="flex gap-2 items-center">
            <Image src={CloseIcon} alt="Ícone fechar" className="h-5 w-5" />
            <p>Close</p>
          </Link>
        </div>

        <div className="mt-10 max-w-md flex-1 min-h-0 ">
          <h1 className="text-3xl  mb-8">Crie sua conta</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <label className="flex flex-col">
              <input
                type="text"
                {...register("name")}
                className="border-b border-gray-300 py-2 bg-transparent outline-none"
                placeholder="Nome completo"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </label>

            <label className="flex flex-col">
              <input
                type="email"
                {...register("email")}
                className="border-b border-gray-300 py-2 bg-transparent outline-none"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </label>

            <label className="flex flex-col relative">
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="flex-1 border-b border-gray-300 py-2 bg-transparent outline-none"
                  placeholder="Senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="ml-3 text-sm text-gray-500"
                >
                  {showPassword ? (
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </label>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`h-12 w-28 mt-4 mb-6 py-3 rounded-md transition ${isValid ? "bg-[#FF6202] hover:bg-[#ff6302e3] cursor-pointer text-white" : "bg-gray-300 text-gray-600"} disabled:opacity-50`}
            >
              {isSubmitting ? "Criando..." : "Cadastrar"}
            </button>
          </form>

          <p className="text-sm">
            Já tem uma conta?{" "}
            <Link href="/sign-in" className="text-blue-900 font-semibold underline">
              Faça login
            </Link>
          </p>
        </div>

        <footer className="text-sm text-gray-500 mt-auto">
          2023 - Itaú Private Bank. All rights reserved. Privacy Policy
        </footer>
      </main>
    </div>
  );
}
