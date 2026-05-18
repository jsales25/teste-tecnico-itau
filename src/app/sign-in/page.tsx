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

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { location: "sp", email: "", password: "" },
  });

  const onSubmit = (data: LoginForm) => {
    // dados válidos (envie para a API aqui)
    console.log("Login válido:", data);
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

      <main className="bg-white flex-1 p-9 text-black">
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

        <div className="mt-10 max-w-md">
          <h1 className="text-3xl font-semibold mb-8">Faça seu login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <label className="flex flex-col">
              <span className="text-sm text-gray-600 mb-2">Selecione sua localização</span>
              <select
                {...register("location")}
                className="border-b border-gray-300 py-2 bg-transparent"
              >
                <option value="sp">São Paulo</option>
                <option value="rj">Rio de Janeiro</option>
                <option value="mg">Minas Gerais</option>
                <option value="pe">Pernambuco</option>
              </select>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-600 mb-2">Email</span>
              <input
                type="email"
                {...register("email")}
                className="border-b border-gray-300 py-2 bg-transparent outline-none"
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </label>

            <label className="flex flex-col relative">
              <span className="text-sm text-gray-600 mb-2">Senha</span>
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="flex-1 border-b border-gray-300 py-2 bg-transparent outline-none"
                  placeholder="Senha"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="ml-3 text-sm text-gray-500">
                  {showPassword ? <Image src={CloseEyeIcon} alt="Ícone olho fechado" className="h-5 w-5" /> : <Image src={OpenEyeIcon} alt="Ícone olho aberto" className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </label>

            <a href="#" className="text-sm text-blue-700">Esqueci minha senha</a>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 mb-6 bg-gray-300 text-gray-600 py-3 rounded-md disabled:opacity-50"
            >
              Continue
            </button>
          </form>

        </div>
        <footer className="text-sm text-gray-500">
            2023 - Itaú Private Bank. All rights reserved. Privacy Policy
          </footer>
      </main>
    </div>
  );
}
