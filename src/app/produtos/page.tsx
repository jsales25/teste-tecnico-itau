"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";

interface Produto {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao carregar produtos");

      const data = await response.json();
      setProdutos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <main className="bg-[#171818] flex-1 p-8 text-white">
        <Header total={produtos.length} onProductCreated={fetchProdutos} />

        {loading ? (
          <p className="mt-10">Carregando produtos...</p>
        ) : error ? (
          <p className="mt-10 text-red-500">{error}</p>
        ) : (
          <div className="flex flex-wrap gap-6 mt-10">
            {produtos.length === 0 ? (
              <p className="text-zinc-500">Nenhum produto encontrado.</p>
            ) : (
              produtos.map((produto) => (
                <ProductCard 
                  key={produto.id} 
                  id={produto.id}
                  title={produto.name} 
                  description={produto.description}
                  onDelete={fetchProdutos}
                  onUpdate={fetchProdutos}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
