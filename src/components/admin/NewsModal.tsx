// src/components/admin/NewsModal.tsx

import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { News, NewsSection } from "../../types";

interface NewsModalProps {
  news?: News | null;
  sections: NewsSection[];
  defaultSectionId: string;
  onSave: (news: Omit<News, "id">) => void;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({
  news,
  sections,
  defaultSectionId,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sectionId, setSectionId] = useState(defaultSectionId);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {}
  );

  useEffect(() => {
    if (news) {
      setTitle(news.title);
      setContent(news.content);
      setSectionId((news as any).sectionId || defaultSectionId); // se hai il campo sectionId in News, altrimenti default
    }
  }, [news, defaultSectionId]);

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Il titolo è obbligatorio";
    } else if (title.trim().length < 3) {
      newErrors.title = "Il titolo deve essere di almeno 3 caratteri";
    }

    if (!content.trim()) {
      newErrors.content = "Il contenuto è obbligatorio";
    } else if (content.trim().length < 10) {
      newErrors.content = "Il contenuto deve essere di almeno 10 caratteri";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      sectionId,
      orderIndex: 0,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-teal-800/90 to-emerald-800/90 backdrop-blur-sm rounded-xl border border-teal-400/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-teal-400/30">
          <h2 className="text-xl font-bold text-white">
            {news ? "Modifica Articolo" : "Nuovo Articolo"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-teal-200 hover:text-white hover:bg-teal-700/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Section Selection (only for new news) */}
          {!news && (
            <div>
              <label
                htmlFor="section"
                className="block text-sm font-medium text-teal-200 mb-2"
              >
                Sezione Articolo
              </label>
              <select
                id="section"
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
                className="w-full px-3 py-2 bg-teal-700/50 border border-teal-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-teal-200 mb-2"
            >
              Titolo *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 bg-teal-700/50 border rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
                errors.title ? "border-red-400" : "border-teal-400/30"
              }`}
              placeholder="Inserisci il titolo dell'articolo"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-300">{errors.title}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-teal-200 mb-2"
            >
              Contenuto *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className={`w-full px-3 py-2 bg-teal-700/50 border rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none ${
                errors.content ? "border-red-400" : "border-teal-400/30"
              }`}
              placeholder="Descrivi l'articolo in dettaglio..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-300">{errors.content}</p>
            )}
            <p className="mt-1 text-xs text-teal-300">
              {content.length} caratteri
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
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
              <Save className="h-4 w-4" />
              <span>{news ? "Salva Modifiche" : "Crea Articolo"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsModal;
