import React, { useState } from "react";
import { Search, Book, ShoppingCart, Settings } from "lucide-react";
import LoginModal from "./LoginModal";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <header
        className="shadow-sm border-b border-gray-800 px-4 py-2"
        style={{ backgroundColor: "#30334E" }}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Titolo */}
          <div className="flex items-center gap-2 select-none">
            <img
              src="https://maracuja-rp.vercel.app/logo.png"
              alt="MaracujaRP Logo"
              className="h-6 w-6 object-contain"
            />
            <span className="text-gray-100 font-bold text-lg">MaracujaRP</span>
          </div>

          {/* Barra di ricerca (solo su desktop) */}
          <div className="hidden sm:flex items-center relative w-64">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cerca..."
              className="w-full pl-9 pr-3 py-1.5 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
            />
          </div>

          {/* Icone azioni */}
          <div className="flex items-center space-x-2">
            <a
              href="https://maracuja-rp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
              title="Vai alle regole"
            >
              <Book className="h-4 w-4" />
            </a>

            <a
              href="https://maracuja-rp.vercel.app/?store"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
              title="Vai allo store"
            >
              <ShoppingCart className="h-4 w-4" />
            </a>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
              title="Impostazioni"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Barra di ricerca su mobile */}
        <div className="flex sm:hidden mt-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cerca..."
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
          />
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
