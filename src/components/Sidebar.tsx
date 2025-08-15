import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Menu, X, ShoppingCart, Book } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const publicMenuItems = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "news", label: "Notizie", icon: Home, path: "/news" },
    { id: "rules", label: "Regole", icon: Book, path: "/rules" },
    { id: "store", label: "Store", icon: ShoppingCart, path: "/store" },
  ];

  const adminMenuItems: any[] = [];
  const menuItems = isAuthenticated ? adminMenuItems : publicMenuItems;

  return (
    <>
      {/* Hamburger mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#262944] p-2 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="text-white h-6 w-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 p-5 flex flex-col transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ backgroundColor: "#262944" }}
      >
        {/* Header sidebar */}
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
            className="lg:hidden fixed top-4 left-4 z-50 bg-[#262944] p-2 rounded-lg"
            onClick={() => setIsOpen(true)}
          >
            <X className="text-white h-5 w-5" />
          </button>
        </div>

        {/* Menu */}
        <div className="mb-5">
          <h3 className="text-gray-400 uppercase text-[12px] font-semibold tracking-wide mb-3">
            Servizi
          </h3>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#FE9900] text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
