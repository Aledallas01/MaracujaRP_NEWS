// src/components/Header.tsx

import React, { useState, useEffect } from "react";
import { Search, Menu, Settings, Sun, ShoppingCart } from "lucide-react";
import StoreUnavailableModal from "./StoreUnavailableModal";
import { InfoAPI } from "../lib/api";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSidebarOpen: (open: boolean) => void;
  onAdminClick?: () => void;
  setActiveSection: (sectionId: string) => void;
  StoreURL?: string;
  UnavailableStoreMessage?: string;
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  setSidebarOpen,
  onAdminClick,
  setActiveSection,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [name, setName] = useState("MaracujaRP");
  const [motd, setMotd] = useState("Benvenuto nel regolamento!");
  const [useURL, setUseURL] = useState(false);
  const [StoreURL, setStoreURL] = useState("");
  const [storeAvailable, setStoreAvailable] = useState(false);
  const [UnavailableStoreMessage, setUnavailableStoreMessage] = useState("");

  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await InfoAPI.getInfo();
        if (data.length > 0) {
          setName(data[0].name);
          setMotd(data[0].motd);
          setUseURL(data[0].use_url);
          setStoreURL(data[0].store_url);
          setStoreAvailable(data[0].store_available);
          setUnavailableStoreMessage(
            data[0].unavailablestoremessage ||
              "Il negozio non è disponibile al momento."
          );
        }
      } catch (err) {
        console.error("Errore nel caricamento delle info per l'header:", err);
      }
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleStoreClick = () => {
    if (storeAvailable) {
      if (useURL) {
        window.open(StoreURL, "_blank");
      } else {
        setActiveSection("store");
      }
    } else {
      setIsStoreModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30 
          backdrop-blur-xl border-b border-orange-400/40 shadow-lg shadow-orange-500/20
        `}
      >
        <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Sidebar */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl text-orange-200 hover:text-white hover:bg-orange-500/40 transition-all duration-200 hover:scale-105"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center ml-2 md:ml-0 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-8 w-8 sm:h-10 sm:w-10 relative z-10 rounded-full"
                  />
                </div>
                <div className="ml-2 sm:ml-4 min-w-0">
                  <h1 className="text-xl font-extrabold bg-gradient-to-r from-orange-200 to-amber-200 bg-clip-text text-transparent truncate">
                    {name}
                  </h1>
                  <div className="hidden sm:flex items-center space-x-2">
                    <Sun className="h-3 w-3 text-amber-400 animate-pulse" />
                    <p className="text-base text-orange-200/90 truncate font-medium">
                      {motd}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg mx-2 sm:mx-4 lg:mx-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-orange-200" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-orange-400/40 rounded-xl sm:rounded-2xl bg-emerald-800/60 backdrop-blur-sm text-white placeholder-orange-200/70 focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-300 transition-all duration-200 hover:bg-emerald-800/70 text-sm sm:text-base"
                  placeholder="Cerca regole..."
                />
              </div>
            </div>

            {/* Icone a destra */}
            <div className="flex items-center space-x-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  storeAvailable
                    ? "bg-green-500 animate-pulse"
                    : "bg-red-500 animate-pulse"
                }`}
              />
              <button
                onClick={handleStoreClick}
                className="relative p-2 sm:p-3 rounded-xl text-orange-200 hover:text-white hover:bg-orange-500/40 transition-all duration-200 hover:scale-105 group"
                title="Store"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
              </button>

              {onAdminClick && (
                <button
                  onClick={onAdminClick}
                  className="relative p-2 sm:p-3 rounded-xl text-orange-200 hover:text-white hover:bg-orange-500/40 transition-all duration-200 hover:scale-105 group"
                  title="Admin Panel"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {isStoreModalOpen && (
        <StoreUnavailableModal
          message={UnavailableStoreMessage}
          onClose={() => setIsStoreModalOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
