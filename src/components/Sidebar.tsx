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
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2">
          {isAuthenticated ? "Dashboard Admin" : "Menu"}
        </h2>
        <div className="w-12 h-1 bg-blue-500 rounded"></div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
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
    </aside>
  );
};

export default Sidebar;
