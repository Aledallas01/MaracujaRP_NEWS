import React, { useEffect, useState } from "react";
import { Tag, X } from "lucide-react";
import { supabaseOther } from "../lib/other";
import { Discount } from "../lib/types";

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

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabaseOther
          .from("discounts")
          .select("*")
          .eq("isActive", true);

        if (error) throw error;
        setActiveDiscounts(data || []);
      } catch (err) {
        console.error("Errore nel fetch degli sconti:", err);
        setError("Impossibile caricare gli sconti.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

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
      <div
        className="flex items-center justify-center h-64"
        style={{ backgroundColor: "#30334E" }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div
          className="bg-gray-800 rounded-lg max-w-lg w-full mx-4 p-6 text-center"
          style={{ backgroundColor: "#30334E" }}
        >
          <p className="text-red-400">{error}</p>
          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Chiudi
          </button>
        </div>
      </div>
    );
  }

  if (activeDiscounts.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div
          className="bg-gray-800 rounded-lg max-w-lg w-full mx-4 p-6 text-center relative"
          style={{ backgroundColor: "#30334E" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            aria-label="Chiudi modal"
          >
            <X size={20} />
          </button>
          <p className="text-gray-300">Nessuno sconto attivo al momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className="bg-gray-800 rounded-lg max-w-lg w-full mx-4 p-6 relative shadow-lg"
        style={{ backgroundColor: "#30334E" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Chiudi modal"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Tag className="h-6 w-6 text-blue-400" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-gray-100">
            Sconti Attivi ({activeDiscounts.length})
          </h3>
        </div>

        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {activeDiscounts.map((d) => {
            const discountValue = d.percentage || d.valore || 0;
            const countdown = getCountdown(d.expiresAt);

            return (
              <li
                key={d.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
              >
                <span className="font-medium text-gray-100">
                  {d.name || "Prodotto sconosciuto"}
                </span>
                <div className="flex items-center flex-wrap gap-2 mt-2 sm:mt-0">
                  {countdown && (
                    <span className="text-xs text-gray-400 italic">
                      Scade tra {countdown}
                    </span>
                  )}
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-md font-semibold text-sm">
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
