import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";

const produtos = [
  { id: 1, title: "Login" },
  { id: 2, title: "Pix" },
  { id: 3, title: "Crédito" },
  { id: 4, title: "Cartões" },
];

export default function ProdutosPage() {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <main className="bg-[#171818] flex-1 p-8">
        <Header total={produtos.length} />

        <div className="flex flex-wrap gap-6 mt-10">
          {produtos.map((produto) => (
            <ProductCard key={produto.id} title={produto.title} />
          ))}
        </div>
      </main>
    </div>
  );
}
