// src/components/PublicRulesView.tsx
import React, { useState, useEffect } from "react";
import { Search, Palmtree, Calendar, User, ArrowRight } from "lucide-react";
import { Rule, RuleSection } from "../lib/types";
import { supabaseOther } from "../lib/other";

const PublicRulesView: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [sections, setSections] = useState<RuleSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Rule | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [rulesResult, sectionsResult] = await Promise.all([
        supabaseOther
          .from("rules")
          .select(`*, section:rule_sections(*)`)
          .order("order_index", { ascending: true }),
        supabaseOther
          .from("rule_sections")
          .select("*")
          .order("order_index", { ascending: true }),
      ]);

      if (rulesResult.data) setRules(rulesResult.data);
      if (sectionsResult.data) setSections(sectionsResult.data);
    } catch (error) {
      console.error("Errore caricamento dati:", error);
    } finally {
      setLoading(false);
    }
  };

  // Apri modal da ?id=xxx
  useEffect(() => {
    if (rules.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const ruleId = params.get("id");

    if (ruleId) {
      const found = rules.find((r) => String(r.id) === ruleId);
      if (found) openModal(found);
    }
  }, [rules]);

  const filteredRules = rules.filter((rule) => {
    const title = rule.title || "";
    const content = rule.content || "";

    const matchesSearch =
      searchQuery === "" ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSection =
      selectedSection === "all" || rule.section_id === selectedSection;

    return matchesSearch && matchesSection;
  });

  const openModal = (rule: Rule) => {
    setModalContent(rule);
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-full" style={{ backgroundColor: "#30334E" }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Regole</h2>

        {/* Search Bar */}
        <div className="relative mb-4 w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cerca regole..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-transparent w-full"
          />
        </div>

        {/* Filtro Sezioni */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSection("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSection === "all"
                ? "bg-orange-600 text-white"
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
                  ? "bg-orange-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      {/* Lista regole */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRules.map((rule) => (
          <article
            key={rule.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 hover:shadow-lg transition-shadow flex flex-col"
          >
            {/* Sezione */}
            {rule.section && (
              <div className="bg-orange-600 text-white text-xs font-semibold px-3 py-1">
                {rule.section.title}
              </div>
            )}

            {/* Contenuto */}
            <div className="flex flex-col justify-between p-6 flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-2">
                  {rule.title}
                </h3>
                <p
                  className="text-gray-300 text-sm mb-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      rule.content.length > 120
                        ? rule.content.slice(0, 120) + "..."
                        : rule.content,
                  }}
                />
              </div>

              {/* Data e autore */}
              <div className="flex flex-col gap-1 text-sm text-gray-400">
                {rule.created_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(rule.created_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {rule.created_by && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{rule.created_by}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => openModal(rule)}
                className="mt-4 self-start flex items-center gap-1 text-orange-500 hover:underline"
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
              className="mt-6 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded text-white"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicRulesView;
