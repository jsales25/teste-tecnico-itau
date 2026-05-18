type ProductCardProps = {
  title: string;
};

export default function ProductCard({ title }: ProductCardProps) {
  return (
    <div className="flex flex-wrap h-20 w-20 rounded-[7px] bg-[#FF6202] justify-center items-center px-4 py-6">
      <p className="text-base font-semibold">{title}</p>
    </div>
  );
}
