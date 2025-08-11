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
        <div className="flex items-center justify-end space-x-4">
          <a
            href="https://maracuja-rp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
            title="Vai al libro"
          >
            <Book className="h-6 w-6" />
          </a>

          <a
            href="https://maracuja-rp.vercel.app/?store"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
            title="Vai al store"
          >
            <ShoppingCart className="h-6 w-6" />
          </a>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
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
