import Image from 'next/image';
import WorldIcon from '@/assets/world-icon.png';
import CloseIcon from '@/assets/close-icon.png';

export default function SignIn() {
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
        <div className='flex justify-between'>
          <div className='flex gap-2'>
          <Image src={WorldIcon} alt='Ícone mundo' className='h-5 w-5'/>
          <p>BR</p>
        </div>

        <div className='flex gap-2'>
          <Image src={CloseIcon} alt='Ícone fechar' className='h-5 w-5'/>
          <p>Close</p>
        </div>
        </div>
        
      </main>
    </div>
  );
}
