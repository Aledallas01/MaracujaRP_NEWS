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
      <header className="bg-gray-900 shadow-sm border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-end space-x-6 border border-gray-700 rounded-lg px-4 py-2 max-w-max ml-auto">
          <a
            href="https://maracuja-rp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-md px-2 py-1 transition-colors"
            title="Vai alle regole"
          >
            <Book className="h-6 w-6" />
            <span className="text-sm select-none">Regole</span>
          </a>

          <a
            href="https://maracuja-rp.vercel.app/?store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-md px-2 py-1 transition-colors"
            title="Vai allo store"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="text-sm select-none">Store</span>
          </a>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-md transition-colors"
            title="Impostazioni"
          >
            <Settings className="h-6 w-6" />
          </button>
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
