import { SquareCheckIcon } from "lucide-react";

function Header() {
  return (
    <header className="w-full h-18 px-6 flex items-center justify-between border-b">
      {/* Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold tracking-wide">
        <SquareCheckIcon size={35} />
        To-DO
        </div>
    </header>
  );
}

export default Header;
