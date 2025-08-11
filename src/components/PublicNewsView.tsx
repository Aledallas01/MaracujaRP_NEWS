import React, { useState, useEffect } from "react";
import { Search, Calendar, User } from "lucide-react";
import { supabase, News, Section } from "../lib/supabase";

interface PublicNewsViewProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const PublicNewsView: React.FC<PublicNewsViewProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const [news, setNews] = useState<News[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [newsResult, sectionsResult] = await Promise.all([
        supabase
          .from("news")
          .select(`*, section:sections(*)`)
          .order("order_index", { ascending: false })
          .order("created_at", { ascending: false }),
        supabase
          .from("sections")
          .select("*")
          .order("order_index", { ascending: true }),
      ]);

      if (newsResult.data) setNews(newsResult.data);
      if (sectionsResult.data) setSections(sectionsResult.data);
    } catch (error) {
      console.error("Errore caricamento dati:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSection =
      selectedSection === "all" || item.section_id === selectedSection;

    return matchesSearch && matchesSection;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Notizie</h2>

        {/* Search Bar */}
        <div className="relative mb-4 w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cerca articoli..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
          />
        </div>

        {/* Filtro Sezioni */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSection("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSection === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Tutte le sezioni
          </button>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSection === section.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Lista News */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 hover:shadow-lg transition-shadow"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                {item.section && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.section.title}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-100 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                {item.content}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{item.created_by}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <div className="mb-2">Nessun articolo trovato</div>
          <p className="text-sm">
            {searchQuery
              ? "Prova a modificare i termini di ricerca"
              : "Non ci sono articoli disponibili"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicNewsView;
