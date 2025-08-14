// src/components/ProductDetailsModal.tsx

import React from "react";
import { Discount } from "../lib/other";

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
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col sm:flex-row relative">
        {/* Immagine */}
        <div className="w-full sm:w-1/2 h-64 sm:h-auto bg-gray-700 relative">
          <img
            src={product.image || "/logo.png"}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/logo.png";
            }}
            className="w-full h-full object-cover"
          />
          {discount && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow animate-pulse">
              -{discount.percentage || discount.valore}% OFF
            </div>
          )}
        </div>

        {/* Contenuto */}
        <div className="p-4 sm:p-6 flex flex-col sm:w-1/2 w-full text-gray-100 relative max-h-[90vh]">
          {/* Titolo */}
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

          {/* Descrizione scrollabile */}
          <div
            className="overflow-y-auto mb-4 text-gray-200 text-sm flex-grow max-h-[150px] sm:max-h-none pr-2 scroll-desc"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#4f46e5 transparent",
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
                  background-color: #4f46e5a6;
                  border-radius: 9999px;
                  border: 2px solid transparent;
                  background-clip: content-box;
                }
                .scroll-desc::-webkit-scrollbar-thumb:hover {
                  background-color: #6366f1;
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
                <p className="text-sm text-gray-400 line-through">
                  €{product.price.toFixed(2)}
                </p>
                <p className="text-xl font-bold text-blue-400">
                  €{discountedPrice.toFixed(2)}
                </p>
                <p className="text-xs text-blue-300">
                  Risparmi €{(product.price - discountedPrice).toFixed(2)} (
                  {discount.percentage || discount.valore}%)
                </p>
              </div>
            ) : (
              <p className="text-xl font-bold text-gray-100">
                €{product.price.toFixed(2)}
              </p>
            )}

            <p className="text-xs text-red-400 italic text-right self-end">
              Non rimborsabile
            </p>
          </div>

          {/* Pulsanti */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Chiudi
            </button>
            <a
              href="https://discord.com/channels/1258732999214632982/1333937942141337721"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-200 text-center"
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
