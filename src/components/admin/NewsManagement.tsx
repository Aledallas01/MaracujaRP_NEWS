import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { News, Section, User } from "../../lib/types";
import { supabase } from "../../lib/news";
import { useAuth } from "../../contexts/AuthContext";

// Variabili per il webhook Discord
const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1404830444226084964/z6sDsQFa_K4ULXwrpYs9_fqIJkgOe4eiPHm6EartEmHn-T_AOKFFFsMlG27gKwkPJLPF";
const NEWS_ROLE_ID = "1404802744811917312";

// Funzione per inviare il webhook Discord
async function sendDiscordWebhook(newsItem: {
  id: string;
  title: string;
  content: string;
  image?: string;
  created_by: string;
  created_at: string;
}) {
  try {
    const payload = {
      username: "Maracuja News",
      avatar_url: "https://maracuja-rp.vercel.app/logo.png",
      content: `<@&${NEWS_ROLE_ID}> Nuova news pubblicata!`,
      embeds: [
        {
          title: newsItem.title,
          description:
            newsItem.content.length > 200
              ? newsItem.content.slice(0, 200) + "..."
              : newsItem.content,
          color: 0xe4934c,
          footer: {
            text: `Autore: ${newsItem.created_by}`,
          },
          thumbnail: newsItem.image ? { url: newsItem.image } : undefined,
          timestamp: newsItem.created_at,
        },
        {
          title: "Leggi tutto l'articolo",
          description: `https://newsmaracuja-rp.vercel.app/?id=${newsItem.id}`,
          color: 0xe4934c,
        },
      ],
    };

    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Errore invio webhook Discord:", await res.text());
    }
  } catch (error) {
    console.error("Errore invio webhook Discord:", error);
  }
}

const NewsManagement: React.FC = () => {
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

  const [news, setNews] = useState<
    (News & { authorName?: string; section?: Section })[]
  >([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    section_id: "",
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [newsResult, sectionsResult, usersResult] = await Promise.all([
        supabase
          .from("news")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("sections")
          .select("*")
          .order("title", { ascending: true }),
        supabase.from("users").select("id, username"),
      ]);

      if (
        !newsResult.error &&
        newsResult.data &&
        !sectionsResult.error &&
        sectionsResult.data &&
        !usersResult.error &&
        usersResult.data
      ) {
        setSections(sectionsResult.data);

        const userMap = new Map(
          usersResult.data.map((user) => [user.id, user.username])
        );

        const newsWithAuthors = newsResult.data.map((item) => ({
          ...item,
          authorName: userMap.get(item.created_by) ?? "Sconosciuto",
          section: sectionsResult.data.find((s) => s.id === item.section_id),
        }));

        setNews(newsWithAuthors);
        setUsers(usersResult.data);
      } else {
        console.error(
          "Errore caricamento dati:",
          newsResult.error || sectionsResult.error || usersResult.error
        );
      }
    } catch (error) {
      console.error("Errore caricamento dati:", error);
    } finally {
      setLoading(false);
    }
  };

  // Salvataggio / modifica news
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId && !permissions.editNews) {
      alert("Non hai i permessi per modificare le news.");
      return;
    }
    if (!editingId && !permissions.createNews) {
      alert("Non hai i permessi per creare news.");
      return;
    }

    try {
      if (editingId) {
        // Modifica news
        await supabase.from("news").update(formData).eq("id", editingId);
        // Se vuoi inviare webhook anche per modifiche, scommenta la prossima riga:
        // await sendDiscordWebhook({ ...formData, id: editingId, created_by: currentUser!.username, created_at: new Date().toISOString() });
      } else {
        // Nuova news: aggiungo created_at e updated_at
        const now = new Date().toISOString();
        const newsData = {
          ...formData,
          created_by: currentUser!.username,
          created_at: now,
          updated_at: now,
        };

        // Inserisco e recupero l’oggetto inserito con id e created_at
        const insertResult = await supabase
          .from("news")
          .insert([newsData])
          .select()
          .single();

        if (insertResult.error) throw insertResult.error;

        // Invio webhook con i dati completi
        await sendDiscordWebhook(insertResult.data);
      }

      await loadData();
      resetForm();
    } catch (error) {
      console.error("Errore salvataggio:", error);
      alert("Errore durante il salvataggio.");
    }
  };

  const handleEdit = (item: News) => {
    if (!permissions.editNews) {
      alert("Non hai i permessi per modificare le news.");
      return;
    }

    setFormData({
      section_id: item.section_id,
      title: item.title,
      content: item.content,
      image: item.image ?? "https://maracuja-rp.vercel.app/logo.png",
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!permissions.deleteNews) {
      alert("Non hai i permessi per eliminare le news.");
      return;
    }

    if (!confirm("Sei sicuro di voler eliminare questa news?")) return;

    try {
      await supabase.from("news").delete().eq("id", id);
      await loadData();
    } catch (error) {
      console.error("Errore eliminazione:", error);
      alert("Errore durante l'eliminazione.");
    }
  };

  const resetForm = () => {
    setFormData({ section_id: "", title: "", content: "", image: "" });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#30334E] min-h-full text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Gestione News</h2>
        {permissions.createNews && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nuova News
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 text-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold">
                {editingId ? "Modifica News" : "Nuova News"}
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
                <label className="block text-sm font-medium mb-2">
                  Sezione
                </label>
                <select
                  value={formData.section_id}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      section_id: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Seleziona sezione</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Titolo News
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Contenuto
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Immagine (URL)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="https://esempio.com/immagine.jpg"
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

      {/* Tabella News */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden mt-6">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Titolo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Sezione
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Autore
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-100">
                    {item.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                    {item.section?.title || "N/D"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {item.authorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {permissions.editNews && (
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-400 hover:text-blue-600 mr-3"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                  {permissions.deleteNews && (
                    <button
                      onClick={() => handleDelete(item.id)}
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

        {news.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Nessuna news trovata
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;
