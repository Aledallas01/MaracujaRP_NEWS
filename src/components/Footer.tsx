import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer
      className="border-t border-gray-800 px-6 py-4 mt-auto"
      style={{ backgroundColor: "#30334E" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Link rapidi */}
        <div className="flex space-x-6 text-gray-300 text-sm">
          <a
            href="https://maracuja-rp.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            Home
          </a>
          <a
            href="https://maracuja-rp.vercel.app/?store"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            Store
          </a>
        </div>

        {/* Icone social */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} MaracujaRP. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
