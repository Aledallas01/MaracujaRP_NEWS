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
        className="shadow-sm border-b border-gray-800 px-3 py-1"
        style={{ backgroundColor: "#30334E" }}
      >
        <div className="flex items-center justify-end space-x-3 border border-gray-700 rounded-md px-3 py-1 max-w-max ml-auto">
          <a
            href="https://maracuja-rp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
            title="Vai alle regole"
          >
            <Book className="h-4 w-4" />
          </a>

          <a
            href="https://maracuja-rp.vercel.app/?store"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
            title="Vai allo store"
          >
            <ShoppingCart className="h-4 w-4" />
          </a>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="p-1 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded transition-colors"
            title="Impostazioni"
          >
            <Settings className="h-4 w-4" />
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
