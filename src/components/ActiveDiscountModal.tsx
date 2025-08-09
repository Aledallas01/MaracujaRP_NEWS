import React, { useEffect, useState } from "react";
import { Tag, X } from "lucide-react";
import { Discount } from "../types";
import { DiscountAPI } from "../lib/api"; // importa la tua API custom

interface ActiveDiscountModalProps {
  onClose: () => void;
}

const ActiveDiscountModal: React.FC<ActiveDiscountModalProps> = ({
  onClose,
}) => {
  const [activeDiscounts, setActiveDiscounts] = useState<Discount[]>([]);
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Aggiorna il timer ogni secondo
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Usa la tua API per fetchare gli sconti attivi da Supabase
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const discounts = await DiscountAPI.getActiveDiscounts();
        setActiveDiscounts(discounts);
      } catch (err) {
        console.error("Errore nel fetch degli sconti:", err);
        setError("Impossibile caricare gli sconti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  // Calcola il countdown
  const getCountdown = (expiresAt?: string | null): string | null => {
    if (!expiresAt) return null;
    const end = new Date(expiresAt);
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return "Scaduto";

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return `${days}g ${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full relative text-orange-200 text-center">
          <p>Caricamento sconti in corso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-red-900 rounded-2xl p-6 max-w-lg w-full relative text-red-400 text-center">
          <p>{error}</p>
          <button onClick={onClose} className="mt-4 underline">
            Chiudi
          </button>
        </div>
      </div>
    );
  }

  if (activeDiscounts.length === 0) {
    return (
      <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full relative text-orange-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-orange-300 hover:text-orange-100"
            aria-label="Chiudi modal"
          >
            <X size={24} />
          </button>
          <p className="text-center text-orange-400">
            Nessuno sconto attivo al momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-r from-orange-900/90 to-amber-900/90 rounded-3xl p-6 max-w-lg w-full relative shadow-lg text-orange-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-orange-300 hover:text-orange-100"
          aria-label="Chiudi modal"
        >
          <X size={24} />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <Tag className="h-6 w-6 text-orange-300" aria-hidden="true" />
          <h3 className="text-xl font-semibold">
            Sconti Attivi ({activeDiscounts.length})
          </h3>
        </div>

        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {activeDiscounts.map((d, i) => {
            const productName = d.name || "Prodotto sconosciuto";
            const discountValue = d.percentage || d.valore || 0;
            const countdown = getCountdown(d.expiresAt);

            return (
              <li
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-orange-300/10 border border-orange-400/30 rounded-xl px-4 py-3"
              >
                <span className="font-medium text-orange-100">
                  {productName}
                </span>
                <div className="flex items-center flex-wrap gap-2 mt-2 sm:mt-0">
                  {countdown && (
                    <span className="text-xs text-orange-300 italic">
                      Scade tra {countdown}
                    </span>
                  )}
                  <span className="bg-orange-400/30 text-orange-100 px-3 py-1 rounded-md font-semibold text-sm">
                    -{discountValue}%
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ActiveDiscountModal;
