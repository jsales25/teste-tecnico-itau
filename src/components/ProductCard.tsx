"use client";

import { useState } from "react";
import Image from "next/image";
import CloseIcon from "@/assets/close-icon.png";
import EditProductModal from "./EditProductModal";
import { useToast } from "./ToastContext";

type ProductCardProps = {
  id: string;
  title: string;
  description?: string;
  onDelete?: () => void;
  onUpdate?: () => void;
};

export default function ProductCard({ id, title, description, onDelete, onUpdate }: ProductCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { showToast } = useToast();

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

      showToast("Produto deletado com sucesso!", "success");
      if (onDelete) onDelete();
    } catch (error) {
      console.error(error);
      showToast("Erro ao deletar produto", "error");
    }
  };

  const handleUpdate = async (product: { name: string; description: string }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description
        })
      });

      if (!response.ok) throw new Error("Erro ao atualizar produto");

      showToast("Produto atualizado com sucesso!", "success");
      setIsEditModalOpen(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error(error);
      showToast("Erro ao atualizar produto", "error");
    }
  };

  return (
    <>
      <div className="relative group flex flex-wrap h-24 w-24 rounded-[7px] bg-[#FF6202] justify-center items-center px-4 py-6">
        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="p-1 hover:bg-black/10 rounded-full transition"
            title="Editar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="invert"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </button>
          <button 
            onClick={handleDelete}
            className="p-1 hover:bg-black/10 rounded-full transition"
            title="Deletar"
          >
            <Image src={CloseIcon} alt="Deletar" className="h-3 w-3 invert" />
          </button>
        </div>
        <p className="text-sm font-semibold text-center leading-tight">{title}</p>
      </div>

      <EditProductModal 
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdate}
        initialData={{
          name: title,
          description: description || ""
        }}
      />
    </>
  );
}
