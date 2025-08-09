// src/components/MainContent.tsx

import React from "react";
import { RuleSection } from "../types";
import RuleCard from "./RuleCard";
import Store from "./Store";
import { Search, Palmtree, Waves } from "lucide-react";

const discordLink = import.meta.env.VITE_LINK_SUPPORTO_DISCORD;

interface MainContentProps {
  sections: RuleSection[];
  activeSection: string;
  searchTerm: string;
}

const MainContent: React.FC<MainContentProps> = ({
  sections,
  activeSection,
  searchTerm,
}) => {
  const currentSection = sections.find(
    (section) => section.id === activeSection
  );

  // 🔍 Nessun risultato con ricerca attiva
  if (searchTerm && sections.every((section) => section.rules.length === 0)) {
    return (
      <main className="flex-1 md:ml-64 p-4 sm:p-6 pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16 bg-gradient-to-br from-teal-800/30 to-emerald-800/30 backdrop-blur-sm rounded-3xl border border-teal-400/30 shadow-xl">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <Waves className="h-20 w-20 text-teal-300/20 animate-pulse" />
              </div>
              <Search className="h-16 w-16 text-orange-300 mx-auto relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-orange-200 mb-3">
              Nessun risultato trovato
            </h3>
            <p className="text-teal-200 text-lg mb-6">
              Prova a modificare la tua ricerca.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // 🔎 Risultati filtrati
  if (searchTerm) {
    return (
      <main className="flex-1 md:ml-64 p-4 sm:p-6 pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-400/30">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
              🔍 Risultati per "{searchTerm}"
            </h2>
            <p className="text-teal-200 text-sm sm:text-base lg:text-lg">
              {sections.reduce(
                (total, section) => total + section.rules.length,
                0
              )}{" "}
              regole trovate
            </p>
          </div>

          <div className="space-y-10">
            {sections.map(
              (section) =>
                section.rules.length > 0 && (
                  <div key={section.id} className="space-y-6">
                    <div className="flex items-center space-x-3 pb-4 border-b border-orange-400/30">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                        <Palmtree className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-200">
                        {section.title}
                      </h3>
                      <div className="bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/30">
                        <span className="text-orange-200 text-sm font-medium">
                          {section.rules.length} regole
                        </span>
                      </div>
                    </div>
                    <div className="grid gap-6">
                      {section.rules.map((rule, index) => (
                        <RuleCard
                          key={rule.id}
                          rule={rule}
                          index={index + 1}
                          searchTerm={searchTerm}
                        />
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </main>
    );
  }

  // 🛑 Sezione non trovata
  if (!currentSection) {
    return (
      <main className="flex-1 md:ml-64 p-4 sm:p-6 pt-20 sm:pt-24">
        <Store />
      </main>
    );
  }

  // 🛍️ Sezione store
  if (currentSection.id === "store") {
    return (
      <main className="flex-1 md:ml-64 pt-20 sm:pt-24">
        <Store />
      </main>
    );
  }

  // ✅ Default: mostra regole della sezione
  return (
    <main className="flex-1 md:ml-64 p-4 sm:p-6 pt-20 sm:pt-24 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header sezione */}
        <div className="mb-6 sm:mb-8 lg:mb-10 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-orange-400/30 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-3 sm:space-y-0 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Palmtree className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
            </div>
            <div className="text-center sm:text-left min-w-0 flex-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 break-words">
                {currentSection.title}
              </h2>
              <div className="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-1 sm:space-y-0 justify-center sm:justify-start">
                <p className="text-teal-200 text-sm sm:text-base lg:text-lg">
                  {currentSection.rules.length} regole
                </p>
                <div className="hidden sm:block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-amber-300 text-xs sm:text-sm">
                  Aggiornato
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lista regole */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8">
          {currentSection.rules.map((rule, index) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              index={index + 1}
              searchTerm={searchTerm}
            />
          ))}
        </div>

        {/* Nessuna regola */}
        {currentSection.rules.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-200">
              Nessuna regola trovata
            </h3>
          </div>
        )}

        {/* Supporto */}
        {currentSection.rules.length > 0 && (
          <div className="mt-8 sm:mt-12 lg:mt-16 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-yellow-500/20 rounded-2xl sm:rounded-3xl border border-orange-400/40 backdrop-blur-sm shadow-xl">
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3 sm:mb-4">
                <Palmtree className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-orange-300" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-200 text-center">
                  Hai domande su queste regole?
                </h3>
                <Palmtree className="hidden sm:block h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-orange-300" />
              </div>
              <p className="text-teal-200 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-2">
                Se hai dubbi o necessiti di chiarimenti sul regolamento, il
                nostro team è sempre pronto ad aiutarti!
              </p>
            </div>
            <div className="flex justify-center">
              <a
                href={discordLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-sm border border-indigo-400/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 hover:from-indigo-500/40 hover:to-purple-500/40 transition-all cursor-pointer shadow-lg hover:shadow-xl w-full sm:w-auto text-center"
              >
                <span className="text-indigo-200 font-medium text-sm sm:text-base lg:text-lg">
                  💬 Supporto Discord
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;
