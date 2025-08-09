// src/components/admin/SectionModal.tsx

import React, { useState, useEffect } from "react";
import { NewsSection } from "../../types";

interface SectionModalProps {
  section: NewsSection | null;
  onClose: () => void;
  onSave: (
    id: string | null,
    title: string,
    description?: string,
    icon?: string,
    orderIndex?: number
  ) => void;
}

const SectionModal: React.FC<SectionModalProps> = ({
  section,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);

  useEffect(() => {
    if (section) {
      setTitle(section.title);
      setDescription(section.description || "");
      setIcon(section.icon || "");
      setOrderIndex(section.orderIndex ?? 0);
    } else {
      setTitle("");
      setDescription("");
      setIcon("");
      setOrderIndex(0);
    }
  }, [section]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(section?.id || null, title, description, icon, orderIndex);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-teal-800/90 to-emerald-800/90 rounded-xl border border-teal-400/30 p-6 max-w-md w-full text-white">
        <h2 className="text-2xl font-semibold mb-4">
          {section ? "Modifica Sezione News" : "Nuova Sezione News"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-teal-300">
              Titolo
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-teal-700/50 border border-teal-400/30 rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-300">
              Descrizione
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-teal-700/50 border border-teal-400/30 rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-300">
              Icona
            </label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-teal-700/50 border border-teal-400/30 rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="es. AlertTriangle"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-300">
              Ordine (index)
            </label>
            <input
              type="number"
              value={orderIndex}
              onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
              className="w-full mt-1 px-3 py-2 bg-teal-700/50 border border-teal-400/30 rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              min={0}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-teal-700/50 text-teal-200 rounded-lg hover:bg-teal-600/50 transition-colors border border-teal-400/30"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
            >
              <span>Salva</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectionModal;
