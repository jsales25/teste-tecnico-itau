import Image from "next/image";
import IconeMais from "@/assets/icone-mais.png";

type HeaderProps = {
  total: number;
};

export default function Header({ total }: HeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-2xl font-semibold text-white">{total} produtos criados</h2>

      <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 cursor-pointer">
        <Image src={IconeMais} alt="Ícone mais" />
        <span>Criar</span>
      </button>
    </div>
  );
}
