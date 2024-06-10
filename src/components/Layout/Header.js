export default function Header() {
  return (
    <header className="h-[48px]">
      <div className="w-full flex justify-between items-center py-2 px-3 bg-slate-100 fixed">
        <div>
          <h1 className="font-semibold text-2xl text-gray-700">Rmail</h1>
        </div>
        <div className=" w-8 h-8 border rounded-full">
          <img src="" alt="" />
        </div>
      </div>
    </header>
  );
}
