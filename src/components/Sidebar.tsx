import React, { useState } from "react";
import {
  Newspaper,
  Users,
  User,
  FolderTree,
  Home,
  Menu,
  X,
  ShoppingCart,
  Book,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const publicMenuItems = [
    { id: "home", label: "Notizie", icon: Home },
    { id: "rules", label: "Regole", icon: Book },
    { id: "store", label: "Store", icon: ShoppingCart },
  ];

  const menuItems = publicMenuItems;

  const handleViewChange = (view: string) => {
    onViewChange(view);
    setIsOpen(false); // Chiude il menu su mobile
  };

  return (
    <>
      {/* Pulsante Hamburger (solo mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#262944] p-2 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="text-white h-6 w-6" />
      </button>

      {/* Overlay scuro quando sidebar aperta su mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 p-5 flex flex-col transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ backgroundColor: "#262944" }}
      >
        {/* Header con chiudi su mobile */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img
              src="https://maracuja-rp.vercel.app/logo.png"
              alt="MaracujaRP Logo"
              className="h-7 w-7 object-contain"
            />
            <h1 className="text-lg font-bold select-none text-white">
              MaracujaRP
            </h1>
          </div>
          <button
            className="md:hidden p-1 rounded-lg hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <X className="text-white h-5 w-5" />
          </button>
        </div>

        {/* Sezione Servizi */}
        <div className="mb-5">
          <h3 className="text-gray-400 uppercase text-[12px] font-semibold tracking-wide mb-3">
            Servizi
          </h3>
          <button
            onClick={() => handleViewChange("home")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === "home"
                ? "bg-[#FE9900] text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <Home className="h-4 w-4" />
            Notizie
          </button>

          <button
            onClick={() => handleViewChange("rules")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === "rules"
                ? "bg-[#FE9900] text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <Book className="h-4 w-4" />
            Regolamento
          </button>

          <button
            onClick={() => handleViewChange("store")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === "store"
                ? "bg-[#FE9900] text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            Store
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
