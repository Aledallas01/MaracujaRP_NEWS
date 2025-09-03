import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 px-6 py-4 mt-auto bg-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Link rapidi */}
        <div className="flex space-x-6 text-gray-300 text-sm">
          <a href="/" className="hover:text-blue-400 transition-colors">
            Home
          </a>
          <a href="/news" className="hover:text-blue-400 transition-colors">
            Notizie
          </a>
          <a href="/rules" className="hover:text-blue-400 transition-colors">
            Regole
          </a>
          <a href="/store" className="hover:text-blue-400 transition-colors">
            Store
          </a>
        </div>

        {/* Icone social */}
        <div className="flex space-x-4">
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <img src="/Social/tiktok.svg" alt="TikTok" className="h-5 w-5" />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <img src="/Social/discord.svg" alt="Discord" className="h-5 w-5" />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <img
              src="/Social/telegram.svg"
              alt="Telegram"
              className="h-5 w-5"
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} MaracujaRP. Tutti i diritti riservati.{" "}
          Non siamo affiliati a Mojang AB.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
