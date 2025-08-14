import React, { useState, useEffect } from "react";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from "../lib/news";
import { News, Section } from "../lib/types";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<News | null>(null);

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

  // Ecco il nuovo useEffect per aprire modal da ?id=xxx
  useEffect(() => {
    if (news.length === 0) return; // aspetta che news siano caricate

    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get("id");

    if (newsId) {
      const foundNews = news.find((n) => String(n.id) === newsId);
      if (foundNews) {
        openModal(foundNews);
      }
    }
  }, [news]);

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSection =
      selectedSection === "all" || item.section_id === selectedSection;

    return matchesSearch && matchesSection;
  });

  const openModal = (item: News) => {
    setModalContent(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
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

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: "#30334E" }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Notizie</h2>

        {/* Search Bar */}
        <div className="relative mb-4 w-full sm:w-64">
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

      {/* Lista News in griglia responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 hover:shadow-lg transition-shadow flex flex-col md:flex-row"
          >
            {/* Immagine con sezione */}
            <div className="relative w-full h-48 md:w-48 md:h-auto flex-shrink-0">
              {item.section && (
                <div className="absolute top-1 left-1 z-10 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-bl-md rounded-tr-md shadow-lg select-none">
                  {item.section.title}
                </div>
              )}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-700 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Contenuto */}
            <div className="flex flex-col justify-between p-6 flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p
                  className="text-gray-300 text-sm mb-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      item.content.length > 120
                        ? item.content.slice(0, 120) + "..."
                        : item.content,
                  }}
                />
              </div>

              {/* Data e autore */}
              <div className="flex flex-col gap-1 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{item.created_by || "Autore Sconosciuto"}</span>
                </div>
              </div>

              <button
                onClick={() => openModal(item)}
                className="mt-4 self-start flex items-center gap-1 text-blue-500 hover:underline"
              >
                Leggi <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && modalContent && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 rounded-lg max-w-2xl w-full mx-4 p-6 overflow-y-auto max-h-[80vh]"
            style={{ backgroundColor: "#30334E" }}
          >
            <h2 className="text-2xl font-bold text-gray-100 mb-4">
              {modalContent.title}
            </h2>
            <p
              className="text-gray-200 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: modalContent.content }}
            />

            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicNewsView;
