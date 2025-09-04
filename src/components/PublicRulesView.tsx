// src/components/PublicRulesView.tsx
import React, { useEffect, useState, useCallback } from "react";
import { Search, BookOpen, ArrowLeft, Calendar, User } from "lucide-react";
import { Rule, RuleSection } from "../lib/types";
import { supabaseOther } from "../lib/other";

// 🔎 Funzione per evidenziare testo
const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(
    regex,
    (match) =>
      `<span class="bg-[#FE9900]/30 text-[#FE9900] font-semibold">${match}</span>`
  );
};

const PublicRulesView: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [sections, setSections] = useState<RuleSection[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadRulesData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [rulesRes, secRes] = await Promise.all([
        supabaseOther
          .from("rules")
          .select(`*, section:rule_sections(*)`)
          .order("order_index", { ascending: true }),
        supabaseOther
          .from("rule_sections")
          .select("*")
          .order("order_index", { ascending: true }),
      ]);

      if (rulesRes.error) setRules([]);
      else
        setRules(Array.isArray(rulesRes.data) ? (rulesRes.data as Rule[]) : []);

      if (secRes.error) setSections([]);
      else
        setSections(
          Array.isArray(secRes.data) ? (secRes.data as RuleSection[]) : []
        );
    } catch (err) {
      console.error("Errore caricamento regole:", err);
      setError("Errore nel caricamento delle regole. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRulesData();
  }, [loadRulesData]);

  useEffect(() => {
    if (rules.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const ruleID = params.get("id");

    if (ruleID) {
      const found = rules.find((r) => String(r.id) === ruleID);
      if (found) setSelectedRule(found);
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
      searchQuery !== ""
        ? true
        : !activeSection || String(rule.section_id) === String(activeSection);

    return matchesSearch && matchesSection;
  });

  if (loading) {
    return (
      <div className="bg-gray-800 min-h-screen text-center py-16">
        <div className="animate-pulse">
          <BookOpen className="h-12 w-12 text-[#FE9900] mx-auto mb-4" />
          <p className="text-white text-lg">Caricamento regole...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 min-h-screen text-center py-16">
        <div className="bg-red-500/10 text-red-300 border border-red-500/30 rounded-xl p-6 inline-block">
          <p className="text-lg font-semibold mb-2">Errore</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#3C3C3C] min-h-screen">
      {/* HERO */}
      <div
        className="relative w-full min-h-[60vh] sm:min-h-[50vh] lg:min-h-[60vh]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(249,115,22,0.9), rgba(251,146,60,0.9)), url('/store-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative overflow-hidden h-full flex flex-col justify-center text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Wrapper relativo */}
          <div className="relative z-30 flex justify-center">
            <img
              src="/trasparent-logo.png"
              alt="Logo Store"
              style={{
                display: "block",
                filter: "drop-shadow(rgba(0, 0, 0, 0.15) 0px 25px 25px)",
                height: "248px",
                objectFit: "contain",
                position: "absolute",
                top: "11px",
                width: "291px",
              }}
            />
          </div>

          {/* Rettangolo grigio responsive */}
          <div
            className="relative z-20 bg-gray-600/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-500/50 text-center shadow-xl"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "200px 48px 0",
              padding: "24px",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
              <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#FE9900]" />
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Regolamento
              </h1>
            </div>
            <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              Esplora il regolamento prima di entrare nel nostro server! Qui
              troverai tutte le regole suddivise in sezioni per una facile
              consultazione. Assicurati di leggerle attentamente per
              un'esperienza di gioco ottimale.
            </p>
          </div>
        </div>

        {/* Ondine */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-12 sm:h-16 md:h-20 lg:h-24"
            preserveAspectRatio="none"
          >
            <path
              fill="#3C3C3C"
              fillOpacity="1"
              d="M0,160 
                C120,200,240,120,360,160 
                C480,200,600,280,720,240 
                C840,200,960,120,1080,160 
                C1200,200,1320,280,1440,240 
                L1440,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* CONTENUTO */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Search */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca regole..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#FE9900] border-none"
            />
          </div>
        </div>

        {/* Sezioni o regole */}
        {!activeSection && searchQuery === "" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div
                key={section.id}
                onClick={() => setActiveSection(String(section.id))}
                style={{
                  cursor: "pointer",
                  background: "rgba(31, 41, 55, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid #374151",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  minHeight: "200px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.border = "3px solid #FE9900";
                  el.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.border = "1px solid #374151";
                  el.style.transform = "scale(1)";
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: "1.125rem", // text-lg
                    color: "white",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  {section.title}
                </h3>
                {section.description && (
                  <p
                    style={{
                      fontSize: "0.875rem", // text-sm
                      color: "#D1D5DB", // text-gray-300
                      textAlign: "center",
                      lineHeight: 1.5,
                    }}
                  >
                    {section.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {activeSection && searchQuery === "" && (
              <button
                onClick={() => setActiveSection(null)}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna alle sezioni
              </button>
            )}

            {filteredRules.length === 0 ? (
              <div className="text-center py-16 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-lg">
                <BookOpen className="h-10 w-10 text-[#FE9900] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  Nessuna regola trovata
                </h3>
                <p className="text-white text-base mb-4">
                  Non ci sono regole che corrispondono alla ricerca.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRules.map((rule) => (
                  <div
                    key={rule.id}
                    onClick={() => setSelectedRule(rule)}
                    className="cursor-pointer bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:bg-gray-700/80 transition-all duration-300"
                  >
                    <h3
                      className="text-lg font-bold text-white mb-2"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(rule.title, searchQuery),
                      }}
                    />
                    <p
                      className="text-gray-300 text-sm mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          rule.content.replace(/<[^>]+>/g, "").slice(0, 150) +
                            "...",
                          searchQuery
                        ),
                      }}
                    />
                    <div className="flex flex-col gap-1 text-xs text-gray-400">
                      {rule.created_at && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(rule.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {rule.created_by && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{rule.created_by}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      {selectedRule && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold text-white mb-4">
              {selectedRule.title}
            </h2>
            <p
              className="text-gray-200 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: selectedRule.content }}
            />
            <button
              onClick={() => setSelectedRule(null)}
              className="mt-6 px-4 py-2 bg-[#FE9900] hover:bg-orange-600 rounded text-white"
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
