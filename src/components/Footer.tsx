// src/components/Footer.tsx

import React, { useState, useEffect } from "react";
import { Palmtree, MessageCircle, Music, MessageSquare } from "lucide-react";

const discordLink = import.meta.env.VITE_LINK_DISCORD;
const telegramLink =
  import.meta.env.VITE_LINK_TELEGRAM ||
  import.meta.env.VITE_LINK_SUPPORTO_DISCORD;
const tiktokLink = import.meta.env.VITE_LINK_TIKTOK;
const versione = import.meta.env.VITE_VERSION_NEWS;

const Footer: React.FC = () => {
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <footer className="bg-gradient-to-r from-emerald-800/80 to-teal-800/80 backdrop-blur-sm border-t border-teal-400/30 mt-8 sm:mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="md:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-3 sm:mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg shadow-lg">
                <Palmtree className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="ml-3 text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
                MaracujaRP
              </span>
            </div>
            <p className="text-teal-200 mb-3 sm:mb-4 text-sm sm:text-base px-2 md:px-0">
              Footer Message
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-orange-200 font-semibold mb-3 sm:mb-4 text-center md:text-left text-sm sm:text-base">
              Collegamenti Utili
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-200 hover:text-orange-300 transition-colors flex items-center justify-center md:justify-start text-sm sm:text-base"
                >
                  <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Discord</span>
                </a>
              </li>
              <li>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-200 hover:text-orange-300 transition-colors flex items-center justify-center md:justify-start text-sm sm:text-base"
                >
                  <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Telegram</span>
                </a>
              </li>
              <li>
                <a
                  href={tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-200 hover:text-orange-300 transition-colors flex items-center justify-center md:justify-start text-sm sm:text-base"
                >
                  <Music className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>TikTok</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-400/30 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-teal-200 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Maracuja Roleplay. Tutti i diritti riservati.
            </p>
            <p className="text-teal-300 text-xs sm:text-sm text-center sm:text-right">
              Versione: 0.0.1
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
