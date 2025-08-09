// src/components/DeleteConfirmModal.tsx

import React from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * Modal per confermare l'eliminazione di un elemento.
 * Mostra un messaggio di warning e due pulsanti: Annulla ed Elimina.
 */
const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  title,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-teal-800/90 to-emerald-800/90 backdrop-blur-sm rounded-xl border border-teal-400/30 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-teal-400/30">
          <div className="flex items-center space-x-3">
            <div className="bg-red-500/30 p-2 rounded-lg border border-red-400/30">
              <AlertTriangle className="h-6 w-6 text-red-300" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Conferma Eliminazione
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-teal-200 hover:text-white hover:bg-teal-700/50 transition-colors"
            aria-label="Chiudi modale conferma eliminazione"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-teal-200 mb-4">Sei sicuro di voler eliminare:</p>
          <div className="bg-teal-700/30 rounded-lg p-3 mb-6 border border-teal-400/20">
            <p className="text-white font-medium">"{title}"</p>
          </div>
          <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 mb-6">
            <p className="text-red-300 text-sm flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Questa azione non può essere annullata.
              <AlertTriangle className="h-4 w-4 ml-1" />
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-teal-700/50 text-teal-200 rounded-lg hover:bg-teal-600/50 transition-colors border border-teal-400/30"
            >
              Annulla
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
            >
              <Trash2 className="h-4 w-4" />
              <span>Elimina</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
