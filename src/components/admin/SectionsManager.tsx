// src/components/admin/SectionsManager.tsx

import React, { useEffect, useState } from "react";
import { RuleSection } from "../../types";
import { sectionsAPI } from "../../lib/api";
import DeleteConfirmModal from "./DeleteConfirmModal";
import SectionModal from "./SectionModal";
import { Pencil, Trash2, Plus } from "lucide-react";

const SectionsManager: React.FC = () => {
  const [sections, setSections] = useState<RuleSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedSection, setSelectedSection] = useState<RuleSection | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchSections = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sectionsAPI.getSections();
      setSections(data);
    } catch (err) {
      setError("Errore caricamento sezioni");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const openEditModal = (section: RuleSection) => {
    setSelectedSection(section);
    setModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedSection(null);
    setModalOpen(true);
  };

  const openDeleteModal = (section: RuleSection) => {
    setSelectedSection(section);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSection) return;
    try {
      await sectionsAPI.deleteSection(selectedSection.id);
      setDeleteModalOpen(false);
      setSelectedSection(null);
      fetchSections();
    } catch (err) {
      alert("Errore durante la cancellazione");
      console.error(err);
    }
  };

  const handleModalSave = async (
    id: string | null,
    title: string,
    description?: string,
    icon?: string,
    orderIndex?: number
  ) => {
    try {
      if (id) {
        await sectionsAPI.updateSection(id, {
          title,
          description,
          icon,
          orderIndex,
        });
      } else {
        await sectionsAPI.createSection(title, description, icon, orderIndex);
      }
      setModalOpen(false);
      fetchSections();
    } catch (err) {
      alert("Errore salvataggio sezione");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestione Sezioni</h2>
          <p className="text-teal-200">{sections.length} sezioni disponibili</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Aggiungi Sezione</span>
        </button>
      </div>

      {loading && <p className="text-teal-200">Caricamento...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <ul className="space-y-4">
        {sections.map((section, index) => (
          <li
            key={section.id}
            className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30 p-6 hover:border-orange-400/50 transition-all"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {section.title}
                  </h3>
                </div>
                <p className="text-teal-100 leading-relaxed mb-4">
                  {section.description}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => openEditModal(section)}
                  className="p-2 text-teal-300 hover:text-blue-300 hover:bg-teal-700/50 rounded-lg transition-colors"
                  title="Modifica"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => openDeleteModal(section)}
                  className="p-2 text-teal-300 hover:text-red-400 hover:bg-teal-700/50 rounded-lg transition-colors"
                  title="Elimina"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <SectionModal
          section={selectedSection}
          onClose={() => setModalOpen(false)}
          onSave={handleModalSave}
        />
      )}

      {deleteModalOpen && selectedSection && (
        <DeleteConfirmModal
          title={selectedSection.title}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default SectionsManager;
