"use client";

import Image from "next/image";
import HomeIcon from "@/assets/home-icon.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });

      localStorage.clear();

      router.push("/sign-in");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <aside className="w-full md:w-72 min-h-screen flex flex-col gap-8 bg-[#0D0E0E] text-white px-9 py-9">
      <div className="flex justify-end">
        <h2 className="bg-white text-[18px] text-black h-10 w-10 rounded-[7px] flex justify-center items-end font-bold">
          itaú
        </h2>
      </div>

      <div className="flex flex-col gap-9 pb-2.5 flex-1">
        <div className="flex gap-3 items-center font-semibold">
          <span className="h-8 w-8 bg-[#FF6202] rounded-[7px] block"></span>
          <h3>Portal</h3>
        </div>

        <div className="flex gap-3 text-[#FF6202] items-center">
          <Image className="w-5 h-5" src={HomeIcon} alt="Ícone Home" />
          <p>Home</p>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <Link 
          href="/change-password"
          className="w-full py-2 text-center text-sm text-zinc-400 hover:text-white transition border border-white/10 rounded-md cursor-pointer"
        >
          Alterar senha
        </Link>
        <button
          onClick={handleLogout}
          className="w-full py-2 text-sm text-zinc-400 hover:text-white transition border border-white/10 rounded-md cursor-pointer"
        >
          Sair do sistema
        </button>
      </div>
    </aside>
  );
}

