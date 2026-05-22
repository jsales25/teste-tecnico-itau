"use client";

import Image from "next/image";
import CloseIcon from "@/assets/close-icon.png";

type ProductCardProps = {
  id: string;
  title: string;
  onDelete?: () => void;
};

export default function ProductCard({ id, title, onDelete }: ProductCardProps) {
  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja deletar o produto "${title}"?`)) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Erro ao deletar produto");

      if (onDelete) onDelete();
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar produto");
    }
  };

  return (
    <div className="relative flex flex-wrap h-24 w-24 rounded-[7px] bg-[#FF6202] justify-center items-center px-4 py-6">
      <button 
        onClick={handleDelete}
        className="absolute top-1 right-1 p-1 hover:bg-black/10 rounded-full transition"
      >
        <Image src={CloseIcon} alt="Deletar" className="h-3 w-3 invert" />
      </button>
      <p className="text-sm font-semibold text-center leading-tight">{title}</p>
    </div>
  );
}
