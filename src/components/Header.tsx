import React, { useState } from "react";
import { Book, ShoppingCart, Settings } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <>
      <header
        className="border-b border-gray-700 px-4 py-3 flex justify-end space-x-4"
        style={{
          background:
            "linear-gradient(90deg, #2d2f5a 0%, #30334E 50%, #2d2f5a 100%)",
          boxShadow: "0 2px 8px rgb(0 0 0 / 0.3)",
          backdropFilter: "saturate(180%) blur(8px)",
        }}
      >
        <a
          href="https://maracuja-rp.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md text-gray-400 hover:text-blue-400 hover:bg-gray-800 transition-colors duration-300 ease-in-out"
          title="Vai alle regole"
          aria-label="Vai alle regole"
        >
          <Book className="h-6 w-6" />
        </a>

        <a
          href="https://maracuja-rp.vercel.app/?store"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md text-gray-400 hover:text-blue-400 hover:bg-gray-800 transition-colors duration-300 ease-in-out"
          title="Vai allo store"
          aria-label="Vai allo store"
        >
          <ShoppingCart className="h-6 w-6" />
        </a>
      </header>
    </>
  );
};

export default Header;
