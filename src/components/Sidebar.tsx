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
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col">
      {/* Logo + scritta */}
      <div className="flex items-center mb-8 gap-3">
        <img
          src="https://maracuja-rp.vercel.app/logo.png"
          alt="MaracujaRP Logo"
          className="h-10 w-10 object-contain"
        />
        <h1 className="text-2xl font-bold select-none">MaracujaRP</h1>
      </div>

      {/* Sezione Servizi */}
      <div className="mb-4">
        <h3 className="text-gray-400 uppercase text-xs font-semibold tracking-wide mb-2">
          Servizi
        </h3>

        {/* Solo voce "Notizie" cliccabile */}
        <button
          onClick={() => onViewChange("home")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
            currentView === "home"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <Home className="h-5 w-5" />
          Notizie
        </button>
      </div>

      {/* Sezione menu admin o altro (solo se autenticato) */}
      {isAuthenticated && (
        <>
          <div className="mb-2 mt-auto">
            <h3 className="text-gray-400 uppercase text-xs font-semibold tracking-wide mb-2">
              Admin
            </h3>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                // Escludo la voce 'home' che è già in "Servizi"
                if (item.id === "home") return null;

                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
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
        </>
      )}
    </aside>
  );
};

export default Sidebar;
