// src/components/StoreUnavailableModal.tsx

import React from "react";
import { AlertTriangle } from "lucide-react";

interface StoreUnavailableModalProps {
  message: string;
  onClose: () => void;
}

const StoreUnavailableModal: React.FC<StoreUnavailableModalProps> = ({
  message,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gradient-to-br from-teal-800/95 to-emerald-800/95 backdrop-blur-xl rounded-2xl border border-teal-400/40 w-full max-w-sm shadow-2xl shadow-orange-500/20 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-xl font-bold text-orange-300">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            Store Non Disponibile
          </h2>
        </div>

        {/* Message */}
        <p className="text-orange-200 text-center">{message}</p>

        {/* Actions */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-orange-500/20 text-orange-100 rounded-xl border border-orange-300/30 hover:bg-orange-500/40 hover:text-white transition-all duration-200"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreUnavailableModal;
