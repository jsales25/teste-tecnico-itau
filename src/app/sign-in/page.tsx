"use client";

import Image from "next/image";
import { useState } from "react";
import WorldIcon from "@/assets/world-icon.png";
import CloseIcon from "@/assets/close-icon.png";
import OpenEyeIcon from "@/assets/open-eye-icon.png";
import CloseEyeIcon from "@/assets/close-eye-icon.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "@/schemas/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useToast } from "@/components/ToastContext";

const BRAZILIAN_STATES = [
  { value: "ac", label: "Acre" },
  { value: "al", label: "Alagoas" },
  { value: "ap", label: "Amapá" },
  { value: "am", label: "Amazonas" },
  { value: "ba", label: "Bahia" },
  { value: "ce", label: "Ceará" },
  { value: "df", label: "Distrito Federal" },
  { value: "es", label: "Espírito Santo" },
  { value: "go", label: "Goiás" },
  { value: "ma", label: "Maranhão" },
  { value: "mt", label: "Mato Grosso" },
  { value: "ms", label: "Mato Grosso do Sul" },
  { value: "mg", label: "Minas Gerais" },
  { value: "pa", label: "Pará" },
  { value: "pb", label: "Paraíba" },
  { value: "pr", label: "Paraná" },
  { value: "pe", label: "Pernambuco" },
  { value: "pi", label: "Piauí" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "rn", label: "Rio Grande do Norte" },
  { value: "rs", label: "Rio Grande do Sul" },
  { value: "ro", label: "Rondônia" },
  { value: "rr", label: "Roraima" },
  { value: "sc", label: "Santa Catarina" },
  { value: "sp", label: "São Paulo" },
  { value: "se", label: "Sergipe" },
  { value: "to", label: "Tocantins" },
];

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { location: "sp", email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await api.post("/api/auth/login", data);

      // 1. Salvamos o token e os dados do usuário
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      showToast("Login realizado com sucesso!", "success");

      // 2. Redirecionamos para a página de produtos
      router.push("/products");
    } catch (err: any) {
      showToast(err.message, "error");
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex bg-[#030204] flex-1 px-9 py-9 overflow-hidden flex-col">
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

      <main className="bg-white flex-1 p-6 md:p-9 text-black flex flex-col min-h-screen">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image src={WorldIcon} alt="Ícone mundo" className="h-5 w-5" />
            <p>BR</p>
          </div>

          <Link href="/sign-up" className="flex gap-2 items-center">
            <Image src={CloseIcon} alt="Ícone fechar" className="h-5 w-5" />
            <p>Close</p>
          </Link>
        </div>

        <div className="mt-10 max-w-md flex-1 min-h-0 ">
          <h1 className="text-3xl mb-8">Faça seu login</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <label className="flex flex-col">
              <span className="text-sm text-gray-600 mb-2">
                Selecione sua localização
              </span>
              <select
                {...register("location")}
                className="border-b  border-gray-300 py-2 bg-transparent cursor-pointer outline-none"
              >
                {BRAZILIAN_STATES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
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

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link href="/change-password" className="text-sm text-blue-900 font-semibold underline">
              Esqueci minha senha
            </Link>

            <p className="text-sm">
            Não tem uma conta?{" "}
            <Link href="/sign-up" className="text-sm text-blue-900 font-semibold underline">
              Criar conta
            </Link>
            </p>
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`h-12 w-28 mt-4 mb-6 py-3 rounded-md transition ${isValid ? "bg-[#FF6202] hover:bg-[#ff6302e3] cursor-pointer text-white" : "bg-gray-300 text-gray-600"} disabled:opacity-50`}
            >
              Continue
            </button>
          </form>
        </div>

        <footer className="text-sm text-gray-500 mt-8 md:mt-auto">
          2023 - Itaú Private Bank. All rights reserved. Privacy Policy
        </footer>
      </main>
    </div>
  );
}
