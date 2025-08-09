// src/components/Sidebar.tsx

import React from "react";
import {
  Shield,
  Users,
  Heart,
  AlertTriangle,
  X,
  PalmTree,
  Info,
  Scale,
  Phone, // lucide ha Phone, non Contact, correggo in iconMap
  Factory,
  Rocket,
  Mic,
} from "lucide-react";
import { RuleSection } from "../types";

interface SidebarProps {
  sections: RuleSection[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const iconMap = {
  Shield,
  Users,
  Heart,
  AlertTriangle,
  PalmTree,
  Info,
  Scale,
  Phone,
  Factory,
  Rocket,
  Mic,
};

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}) => {
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-screen w-72 sm:w-80 md:w-64
          bg-gradient-to-b from-teal-800/90 via-emerald-800/90 to-teal-900/90
          backdrop-blur-xl border-r border-teal-400/40 z-40 shadow-2xl shadow-teal-500/20
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col overflow-y-auto
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-teal-400/30 md:hidden bg-gradient-to-r from-orange-500/20 to-amber-500/20">
          <div className="flex items-center space-x-3">
            <PalmTree className="h-5 w-5 sm:h-6 sm:w-6 text-orange-300" />
            <h2 className="text-base sm:text-lg font-bold text-orange-200">
              Sezioni
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl text-orange-200 hover:text-white hover:bg-teal-600/50 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="p-4 sm:p-6 space-y-3 flex-1 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#3c7ce2b6 transparent",
          }}
        >
          <style>
            {`
              nav::-webkit-scrollbar {
                width: 6px;
              }
              nav::-webkit-scrollbar-track {
                background: transparent;
              }
              nav::-webkit-scrollbar-thumb {
                background-color: #3b83f69694;
                border-radius: 9999px;
                border: 2px solid transparent;
                background-clip: content-box;
              }
              nav::-webkit-scrollbar-thumb:hover {
                background-color: #3f81ecff;
              }

              nav, div[class*="fixed"] {
                -webkit-overflow-scrolling: touch;
                overscroll-behavior: contain;
              }
            `}
          </style>

          <br />
          <br />

          {sections.map((section) => {
            const IconComponent =
              iconMap[section.icon as keyof typeof iconMap] || PalmTree;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`
                  w-full group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105
                  ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500/40 to-amber-500/40 border-2 border-orange-400/60 shadow-lg shadow-orange-500/30"
                      : "bg-teal-700/30 border border-teal-400/20 hover:bg-teal-600/40 hover:border-teal-300/40"
                  }
                `}
              >
                <div className="flex items-center p-3 sm:p-4 text-left relative z-10 min-h-[3.5rem] sm:min-h-[4rem]">
                  <div
                    className={`
                      p-1.5 sm:p-2 rounded-xl mr-3 sm:mr-4 transition-all duration-200 flex-shrink-0
                      ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg"
                          : "bg-teal-600/50 group-hover:bg-teal-500/60"
                      }
                    `}
                  >
                    <IconComponent
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        isActive
                          ? "text-white"
                          : "text-teal-200 group-hover:text-white"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 mr-2 sm:mr-3">
                    <span
                      className={`font-semibold block text-sm sm:text-base leading-tight ${
                        isActive
                          ? "text-white"
                          : "text-teal-100 group-hover:text-white"
                      }`}
                    >
                      {section.title}
                    </span>
                    <span
                      className={`text-xs leading-tight ${
                        isActive ? "text-orange-200" : "text-teal-300"
                      }`}
                    >
                      {section.rules.length} regole
                    </span>
                  </div>
                  <div
                    className={`
                      flex-shrink-0
                      px-2 sm:px-3 py-1 rounded-full text-xs font-bold transition-all
                      ${
                        isActive
                          ? "bg-orange-500/40 text-orange-100 border border-orange-400/50"
                          : "bg-teal-600/50 text-teal-200 border border-teal-400/30 group-hover:bg-teal-500/60"
                      }
                    `}
                  >
                    {section.rules.length}
                  </div>
                </div>

                {/* Animated background */}
                <div
                  className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-gradient-to-r from-teal-500/10 to-emerald-500/10
                    ${isActive ? "opacity-20" : ""}
                  `}
                ></div>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
