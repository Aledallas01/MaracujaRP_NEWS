// src/components/admin/NewsManager.tsx

import React, { useState } from "react";
import { NewsSection, News } from "../../types";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import NewsModal from "./NewsModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface NewsManagerProps {
  sections: NewsSection[];
  selectedSection: string;
  onAddNews: (sectionId: string, news: Omit<News, "id">) => void;
  onUpdateNews: (
    sectionId: string,
    newsId: string,
    news: Partial<News>
  ) => void;
  onDeleteNews: (newsId: string) => void;
}

const NewsManager: React.FC<NewsManagerProps> = ({
  sections,
  selectedSection,
  onAddNews,
  onUpdateNews,
  onDeleteNews,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [deletingNews, setDeletingNews] = useState<{
    sectionId: string;
    news: News;
  } | null>(null);

  const currentSection = sections.find((s) => s.id === selectedSection);

  const filteredNews =
    currentSection?.news.filter(
      (news) =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.content.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleAddNews = () => {
    setEditingNews(null);
    setShowNewsModal(true);
  };

  const handleEditNews = (news: News) => {
    setEditingNews(news);
    setShowNewsModal(true);
  };

  const handleDeleteNews = (news: News) => {
    setDeletingNews({ sectionId: selectedSection, news });
    setShowDeleteModal(true);
  };

  const handleSaveNews = (newsData: Omit<News, "id">) => {
    if (editingNews) {
      onUpdateNews(selectedSection, editingNews.id, newsData);
    } else {
      onAddNews(selectedSection, newsData);
    }
    setShowNewsModal(false);
    setEditingNews(null);
  };

  const confirmDelete = () => {
    if (deletingNews) {
      onDeleteNews(deletingNews.news.id);
      setShowDeleteModal(false);
      setDeletingNews(null);
    }
  };

  if (!currentSection) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-teal-200">
          Sezione non trovata
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {currentSection.title}
          </h2>
          <p className="text-teal-200">
            {currentSection.news.length} articoli in questa sezione
          </p>
        </div>
        <button
          onClick={handleAddNews}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Aggiungi Articolo</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-teal-300" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-teal-400/30 rounded-lg bg-teal-800/50 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          placeholder="Cerca articoli..."
        />
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30">
            <h3 className="text-lg font-semibold text-teal-200 mb-2">
              {searchTerm
                ? "Nessun articolo trovato"
                : "Nessun articolo in questa sezione"}
            </h3>
            <p className="text-teal-300 mb-4">
              {searchTerm
                ? "Prova a modificare i termini di ricerca"
                : "Inizia aggiungendo il primo articolo"}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddNews}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
              >
                Aggiungi Primo Articolo
              </button>
            )}
          </div>
        ) : (
          filteredNews.map((news, index) => (
            <div
              key={news.id}
              className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30 p-6 hover:border-orange-400/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {news.title}
                    </h3>
                  </div>
                  <p className="text-teal-100 leading-relaxed mb-4">
                    {news.content}
                  </p>

                  {(news.createdAt || news.updatedAt) && (
                    <div className="flex items-center space-x-4 text-xs text-teal-300">
                      {news.createdAt && (
                        <span>
                          Creata:{" "}
                          {new Date(news.createdAt).toLocaleDateString("it-IT")}
                        </span>
                      )}
                      {news.updatedAt && (
                        <span>
                          Modificata:{" "}
                          {new Date(news.updatedAt).toLocaleDateString("it-IT")}
                        </span>
                      )}
                      {news.createdBy && <span>da {news.createdBy}</span>}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEditNews(news)}
                    className="p-2 text-teal-300 hover:text-blue-300 hover:bg-teal-700/50 rounded-lg transition-colors"
                    title="Modifica articolo"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteNews(news)}
                    className="p-2 text-teal-300 hover:text-red-300 hover:bg-teal-700/50 rounded-lg transition-colors"
                    title="Elimina articolo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {showNewsModal && (
        <NewsModal
          news={editingNews}
          sections={sections}
          defaultSectionId={selectedSection}
          onSave={handleSaveNews}
          onClose={() => {
            setShowNewsModal(false);
            setEditingNews(null);
          }}
        />
      )}

      {showDeleteModal && deletingNews && (
        <DeleteConfirmModal
          title={deletingNews.news.title}
          onConfirm={confirmDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setDeletingNews(null);
          }}
        />
      )}
    </div>
  );
};

export default NewsManager;
