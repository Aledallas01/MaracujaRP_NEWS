// src/components/admin/RulesManager.tsx

import React, { useState } from "react";
import { RuleSection, Rule } from "../../types";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import RuleModal from "./RuleModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface RulesManagerProps {
  sections: RuleSection[];
  selectedSection: string;
  onAddRule: (sectionId: string, rule: Omit<Rule, "id">) => void;
  onUpdateRule: (
    sectionId: string,
    ruleId: string,
    rule: Partial<Rule>
  ) => void;
  onDeleteRule: (ruleId: string) => void;
  onMoveRule: (
    fromSectionId: string,
    toSectionId: string,
    ruleId: string
  ) => void;
}

const RulesManager: React.FC<RulesManagerProps> = ({
  sections,
  selectedSection,
  onAddRule,
  onUpdateRule,
  onDeleteRule,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [deletingRule, setDeletingRule] = useState<{
    sectionId: string;
    rule: Rule;
  } | null>(null);

  const currentSection = sections.find((s) => s.id === selectedSection);

  const filteredRules =
    currentSection?.rules.filter(
      (rule) =>
        rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.content.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleAddRule = () => {
    setEditingRule(null);
    setShowRuleModal(true);
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
    setShowRuleModal(true);
  };

  const handleDeleteRule = (rule: Rule) => {
    setDeletingRule({ sectionId: selectedSection, rule });
    setShowDeleteModal(true);
  };

  const handleSaveRule = (ruleData: Omit<Rule, "id">) => {
    if (editingRule) {
      onUpdateRule(selectedSection, editingRule.id, ruleData);
    } else {
      onAddRule(selectedSection, ruleData);
    }
    setShowRuleModal(false);
    setEditingRule(null);
  };

  const confirmDelete = () => {
    if (deletingRule) {
      onDeleteRule(deletingRule.rule.id);
      setShowDeleteModal(false);
      setDeletingRule(null);
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
            {currentSection.rules.length} regole in questa sezione
          </p>
        </div>
        <button
          onClick={handleAddRule}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Aggiungi Regola</span>
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
          placeholder="Cerca regole..."
        />
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {filteredRules.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30">
            <h3 className="text-lg font-semibold text-teal-200 mb-2">
              {searchTerm
                ? "Nessuna regola trovata"
                : "Nessuna regola in questa sezione"}
            </h3>
            <p className="text-teal-300 mb-4">
              {searchTerm
                ? "Prova a modificare i termini di ricerca"
                : "Inizia aggiungendo la prima regola"}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddRule}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
              >
                Aggiungi Prima Regola
              </button>
            )}
          </div>
        ) : (
          filteredRules.map((rule, index) => (
            <div
              key={rule.id}
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
                      {rule.title}
                    </h3>
                  </div>
                  <p className="text-teal-100 leading-relaxed mb-4">
                    {rule.content}
                  </p>

                  {(rule.createdAt || rule.updatedAt) && (
                    <div className="flex items-center space-x-4 text-xs text-teal-300">
                      {rule.createdAt && (
                        <span>
                          Creata:{" "}
                          {new Date(rule.createdAt).toLocaleDateString("it-IT")}
                        </span>
                      )}
                      {rule.updatedAt && (
                        <span>
                          Modificata:{" "}
                          {new Date(rule.updatedAt).toLocaleDateString("it-IT")}
                        </span>
                      )}
                      {rule.createdBy && <span>da {rule.createdBy}</span>}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEditRule(rule)}
                    className="p-2 text-teal-300 hover:text-blue-300 hover:bg-teal-700/50 rounded-lg transition-colors"
                    title="Modifica regola"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteRule(rule)}
                    className="p-2 text-teal-300 hover:text-red-300 hover:bg-teal-700/50 rounded-lg transition-colors"
                    title="Elimina regola"
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
      {showRuleModal && (
        <RuleModal
          rule={editingRule}
          sections={sections}
          defaultSectionId={selectedSection}
          onSave={handleSaveRule}
          onClose={() => {
            setShowRuleModal(false);
            setEditingRule(null);
          }}
        />
      )}

      {showDeleteModal && deletingRule && (
        <DeleteConfirmModal
          title={deletingRule.rule.title}
          onConfirm={confirmDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setDeletingRule(null);
          }}
        />
      )}
    </div>
  );
};

export default RulesManager;
