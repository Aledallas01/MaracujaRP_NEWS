// src/components/ProductDetailsModal.tsx

import React from "react";
import { Discount } from "../types";

interface ProductDetailsModalProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  discount?: Discount | null;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  discount,
  onClose,
}) => {
  const discountedPrice = discount
    ? product.price * (1 - (discount.percentage || discount.valore || 0) / 100)
    : product.price;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gradient-to-br from-teal-800/95 to-emerald-800/95 rounded-2xl border border-teal-400/40 shadow-2xl shadow-orange-500/20 w-full max-w-md sm:max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col sm:flex-row relative">
        {/* Immagine */}
        <div className="w-full sm:w-1/2 h-64 sm:h-auto bg-teal-900 relative">
          <img
            src={product.image || "/logo.png"}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/logo.png";
            }}
            className="w-full h-full object-cover"
          />
          {discount && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
              -{discount.percentage || discount.valore}% OFF
            </div>
          )}
        </div>

        {/* Contenuto */}
        <div className="p-4 sm:p-6 flex flex-col sm:w-1/2 w-full text-orange-100 relative max-h-[90vh]">
          {/* Titolo */}
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-orange-300">
              {product.name}
            </h2>
          </div>

          {/* Descrizione scrollabile */}
          <div
            className="scroll-desc overflow-y-auto pr-2 mb-4 text-sm text-teal-100 space-y-3 flex-grow max-h-[150px] sm:max-h-none"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#f97316a6 transparent",
            }}
          >
            <style>
              {`
                .scroll-desc::-webkit-scrollbar {
                  width: 6px;
                }
                .scroll-desc::-webkit-scrollbar-track {
                  background: transparent;
                }
                .scroll-desc::-webkit-scrollbar-thumb {
                  background-color: #f97316a6;
                  border-radius: 9999px;
                  border: 2px solid transparent;
                  background-clip: content-box;
                }
                .scroll-desc::-webkit-scrollbar-thumb:hover {
                  background-color: #fb923c;
                }
                .scroll-desc {
                  -webkit-overflow-scrolling: touch;
                  overscroll-behavior: contain;
                }
              `}
            </style>
            <div
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          </div>

          {/* Prezzo + Nota */}
          <div className="flex items-end justify-between flex-wrap gap-2 mb-4">
            {discount ? (
              <div className="space-y-1">
                <p className="text-sm text-teal-300 line-through">
                  €{product.price.toFixed(2)}
                </p>
                <p className="text-xl font-bold text-green-400">
                  €{discountedPrice.toFixed(2)}
                </p>
                <p className="text-xs text-green-300">
                  Risparmi €{(product.price - discountedPrice).toFixed(2)} (
                  {discount.percentage || discount.valore}%)
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold text-orange-300">
                €{product.price.toFixed(2)}
              </p>
            )}

            <p className="text-xs text-red-300 italic text-right self-end">
              Non rimborsabile
            </p>
          </div>

          {/* Pulsanti */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-orange-500/20 text-orange-100 rounded-xl border border-orange-300/30 hover:bg-orange-500/40 hover:text-white transition-all duration-200"
            >
              Chiudi
            </button>
            <a
              href={import.meta.env.VITE_LINK_SUPPORTO_DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-indigo-500/30 text-indigo-100 rounded-xl border border-indigo-300/30 hover:bg-indigo-500/50 hover:text-white transition-all duration-200 text-center"
            >
              Supporto Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
