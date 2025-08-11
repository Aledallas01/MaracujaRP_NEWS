import React from "react";
import { Newspaper, Users, FolderTree, Home } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { isAuthenticated } = useAuth();

  const publicMenuItems = [{ id: "home", label: "Notizie", icon: Home }];

  const adminMenuItems = [
    { id: "news", label: "News", icon: Newspaper },
    { id: "sections", label: "Sections", icon: FolderTree },
    { id: "users", label: "Users", icon: Users },
  ];

  const menuItems = isAuthenticated ? adminMenuItems : publicMenuItems;

  return (
    <aside
      className="text-white w-64 min-h-screen p-5 flex flex-col"
      style={{ backgroundColor: "#262944" }}
    >
      {/* Logo + scritta */}
      <div className="flex items-center mb-6 gap-2">
        <img
          src="https://maracuja-rp.vercel.app/logo.png"
          alt="MaracujaRP Logo"
          className="h-7 w-7 object-contain"
        />
        <h1 className="text-lg font-bold select-none">MaracujaRP</h1>
      </div>

      {/* Sezione Servizi */}
      <div className="mb-5">
        <h3 className="text-gray-400 uppercase text-[10px] font-semibold tracking-wide mb-3">
          Servizi
        </h3>

        {/* Bottone Notizie */}
        <button
          onClick={() => onViewChange("home")}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentView === "home"
              ? "bg-[#666CFF] text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          <Home className="h-4 w-4" />
          Notizie
        </button>
      </div>

      {/* Sezione menu admin solo se autenticato */}
      {isAuthenticated && (
        <div className="mt-auto mb-2">
          <h3 className="text-gray-400 uppercase text-[10px] font-semibold tracking-wide mb-2">
            Admin
          </h3>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              if (item.id === "home") return null; // Escludo 'home'

              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
