import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { supabase } from "../../lib/news";
import { Section, User } from "../../lib/types";
import { useAuth } from "../../contexts/AuthContext";

const SectionsManagement: React.FC = () => {
  const { currentUser } = useAuth();

  const permissions = currentUser?.permissions ?? {
    createSections: false,
    editSections: false,
    deleteSections: false,
    createNews: false,
    editNews: false,
    deleteNews: false,
    manageUsers: false,
  };

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  // Carica utente e permessi + sezioni al mount
  useEffect(() => {
    fetchCurrentUserAndPermissions();
    loadSections();
  }, []);

  // Fetch utente e permessi dalla tabella permission
  const fetchCurrentUserAndPermissions = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    // Prendo dati utente base
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, username")
      .eq("id", session.user.id)
      .single();

    if (userError || !userData) {
      console.error("Errore caricamento utente:", userError);
      return;
    }

    // Prendo permessi da permission
    const { data: permData, error: permError } = await supabase
      .from("permission")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (permError || !permData) {
      console.error("Errore caricamento permessi:", permError);
      setPermissions(permissions);
      return;
    }

    setPermissions(permData as Permissions);
  };

  // Carica sezioni
  const loadSections = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("sections")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (err) {
      console.error("Errore caricamento sezioni:", err);
    } finally {
      setLoading(false);
    }
  };

  // Salvataggio / modifica sezione
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId && !permissions.editSections) {
      alert("Non hai i permessi per modificare le sezioni.");
      return;
    }
    if (!editingId && !permissions.createSections) {
      alert("Non hai i permessi per creare nuove sezioni.");
      return;
    }

    try {
      const sectionData = {
        ...formData,
        created_by: currentUser?.username || "Sconosciuto",
        order_index: editingId
          ? sections.findIndex((s) => s.id === editingId) // mantieni ordine attuale in modifica
          : sections.length, // nuova sezione in fondo
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        await supabase.from("sections").update(sectionData).eq("id", editingId);
      } else {
        await supabase.from("sections").insert([sectionData]);
      }

      await loadSections();
      resetForm();
    } catch (err) {
      console.error("Errore salvataggio sezione:", err);
      alert("Errore durante il salvataggio.");
    }
  };

  // Avvia modifica
  const handleEdit = (section: Section) => {
    if (!permissions.editSections) {
      alert("Non hai i permessi per modificare le sezioni.");
      return;
    }
    setFormData({
      title: section.title,
      description: section.description,
      icon: section.icon,
    });
    setEditingId(section.id);
    setShowForm(true);
  };

  // Elimina sezione
  const handleDelete = async (id: string) => {
    if (!permissions.deleteSections) {
      alert("Non hai i permessi per eliminare le sezioni.");
      return;
    }
    if (!confirm("Sei sicuro di voler eliminare questa sezione?")) return;

    try {
      await supabase.from("sections").delete().eq("id", id);
      await loadSections();
    } catch (err) {
      console.error("Errore eliminazione sezione:", err);
      alert("Errore durante l'eliminazione.");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ title: "", description: "", icon: "" });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#30334E]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#30334E] min-h-full text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Gestione Sezioni</h2>
        {permissions.createSections && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nuova Sezione
          </button>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 text-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold">
                {editingId ? "Modifica Sezione" : "Nuova Sezione"}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titolo</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Descrizione
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Icon (Lucide)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="es: newspaper, calendar, megaphone"
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabella sezioni */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden mt-6">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Titolo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Descrizione
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Autore
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {sections.map((section) => (
              <tr key={section.id} className="hover:bg-gray-700">
                <td className="px-6 py-4">{section.title}</td>
                <td className="px-6 py-4 text-gray-400">
                  {section.description}
                </td>
                <td className="px-6 py-4">
                  <code className="text-sm bg-gray-700 px-2 py-1 rounded">
                    {section.icon}
                  </code>
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {section.created_by}
                </td>
                <td className="px-6 py-4 text-right">
                  {permissions.editSections && (
                    <button
                      onClick={() => handleEdit(section)}
                      className="text-blue-400 hover:text-blue-600 mr-3"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                  {permissions.deleteSections && (
                    <button
                      onClick={() => handleDelete(section.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sections.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nessuna sezione trovata
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionsManagement;
