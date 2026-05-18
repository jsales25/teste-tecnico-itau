export default function SignIn() {
  return (
    <div className="flex h-screen">
      <aside className="bg-[#030204] flex-1 px-9 py-9">
        <div>
          <h2 className="bg-white text-[18px] text-black h-10 w-10 rounded-[7px] flex justify-center items-end font-bold">
            itaú
          </h2>
        </div>

        <div className="flex justify-center items-center h-20 w-20 rounded-[7px] bg-orange-500">
            <p></p>
        </div>
      </aside>

      <main className="bg-white flex-1">
        <h1>LOGIN</h1>
      </main>
    </div>
  );
}
