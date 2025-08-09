// src/components/HeaderIcons.tsx

import React from "react";
import { ShoppingCart, BookOpen, LayoutDashboard } from "lucide-react";
import "../index.css";

interface HeaderProps {
  onOpenAdminModal: () => void;
}

const HeaderIcons: React.FC<HeaderProps> = ({ onOpenAdminModal }) => {
  const goToRules = () => {
    window.location.href = "https://maracuja-rp.vercel.app/";
  };

  const goToStore = () => {
    window.location.href = "https://maracuja-rp.vercel.app/?store";
  };

  return (
    <div className="header space-x-3">
      {/* Icona Carrello */}
      <button
        onClick={goToStore}
        className="p-2 rounded-xl text-orange-200 hover:text-white hover:bg-orange-500/40 transition-all duration-200 hover:scale-110"
        title="Store"
      >
        <ShoppingCart className="h-5 w-5" />
      </button>

      {/* Icona Regole */}
      <button
        onClick={goToRules}
        className="p-2 rounded-xl text-orange-200 hover:text-white hover:bg-orange-500/40 transition-all duration-200 hover:scale-110"
        title="Regole"
      >
        <BookOpen className="h-5 w-5" />
      </button>

      {/* Icona Admin */}
      <button
        onClick={onOpenAdminModal}
        className="p-2 rounded-xl text-orange-200 hover:text-white hover:bg-orange-500/40 transition-all duration-200 hover:scale-110"
        title="Admin"
      >
        <LayoutDashboard className="h-5 w-5" />
      </button>
    </div>
  );
};

export default HeaderIcons;
