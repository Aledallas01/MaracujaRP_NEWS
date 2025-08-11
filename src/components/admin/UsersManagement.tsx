import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

interface Permissions {
  createSections: boolean;
  editSections: boolean;
  deleteSections: boolean;
  createNews: boolean;
  editNews: boolean;
  deleteNews: boolean;
  manageUsers: boolean;
}

interface User {
  id: string;
  username: string;
  created_at: string;
  updated_at?: string;
  permissions: Permissions;
}

// Etichette per checkbox permessi
const permLabels: Record<keyof Permissions, string> = {
  createSections: "Crea Sezioni",
  editSections: "Modifica Sezioni",
  deleteSections: "Elimina Sezioni",
  createNews: "Crea News",
  editNews: "Modifica News",
  deleteNews: "Elimina News",
  manageUsers: "Gestione Utenti",
};

const emptyPermissions: Permissions = {
  createSections: false,
  editSections: false,
  deleteSections: false,
  createNews: false,
  editNews: false,
  deleteNews: false,
  manageUsers: false,
};

const UsersManagement: React.FC = () => {
  const { currentUser, permissions: userPermissions } = useAuth();

  const permissions = userPermissions ?? emptyPermissions;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    permissions: Permissions;
  }>({
    username: "",
    password: "",
    permissions: emptyPermissions,
  });

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Carica utenti con permessi joinati da permission
  const loadUsers = async () => {
    setLoading(true);
    try {
      // Join tra users e permission
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          id,
          username,
          created_at,
          updated_at,
          permission:permission(
            createSections,
            editSections,
            deleteSections,
            createNews,
            editNews,
            deleteNews,
            manageUsers
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        // Mappa dati combinati
        const usersWithPermissions: User[] = data.map((u: any) => ({
          id: u.id,
          username: u.username,
          created_at: u.created_at,
          updated_at: u.updated_at,
          permissions: u.permission || emptyPermissions,
        }));

        setUsers(usersWithPermissions);
      }
    } catch (error) {
      console.error("Errore caricamento utenti:", error);
    } finally {
      setLoading(false);
    }
  };

  // Salva o crea utente e permessi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Controlli permessi lato frontend
    if (editingId && !permissions.manageUsers) {
      alert("Non hai i permessi per modificare utenti.");
      return;
    }
    if (!editingId && !permissions.manageUsers) {
      alert("Non hai i permessi per creare utenti.");
      return;
    }

    // Dati base utente
    const userData: Partial<User> = {
      username: formData.username,
      updated_at: new Date().toISOString(),
    };

    // Password richiesta solo se nuovo utente
    if (!editingId) {
      if (!formData.password.trim()) {
        alert("La password è obbligatoria per creare un nuovo utente.");
        return;
      }
      // ⚠️ Attenzione: password va hashata nel backend, qui demo
      (userData as any).password = formData.password;
    }

    try {
      if (editingId) {
        // Aggiorna utente
        await supabase.from("users").update(userData).eq("id", editingId);
        // Aggiorna permessi (solo se la riga esiste, altrimenti errore)
        await supabase
          .from("permission")
          .update(formData.permissions)
          .eq("user_id", editingId);
      } else {
        // Inserisce nuovo utente e permessi
        const { data: insertData, error: insertError } = await supabase
          .from("users")
          .insert([userData])
          .select("id")
          .single();

        if (insertError || !insertData) {
          alert("Errore creazione utente.");
          return;
        }

        // Inserisci permessi associati
        await supabase
          .from("permission")
          .insert([{ user_id: insertData.id, ...formData.permissions }]);
      }

      await loadUsers();
      resetForm();
    } catch (error) {
      console.error("Errore salvataggio utente:", error);
      alert("Errore nel salvataggio. Controlla la console.");
    }
  };

  const handleEdit = (user: User) => {
    setFormData({
      username: user.username,
      password: "",
      permissions: user.permissions || emptyPermissions,
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!permissions.manageUsers) {
      alert("Non hai i permessi per eliminare utenti.");
      return;
    }

    if (!confirm("Sei sicuro di voler eliminare questo utente?")) return;

    try {
      // Elimina prima permessi
      await supabase.from("permission").delete().eq("user_id", id);
      // Poi elimina utente
      await supabase.from("users").delete().eq("id", id);

      await loadUsers();
    } catch (error) {
      console.error("Errore eliminazione utente:", error);
      alert("Errore durante l'eliminazione.");
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      permissions: emptyPermissions,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const togglePermission = (perm: keyof Permissions) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [perm]: !prev.permissions[perm],
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#30334E] min-h-full text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Gestione Utenti</h2>
        {permissions.manageUsers && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nuovo Utente
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-auto text-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold">
                {editingId ? "Modifica Utente" : "Nuovo Utente"}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-200"
                aria-label="Chiudi"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password{" "}
                  {editingId && (
                    <span className="text-xs text-gray-400">
                      (lascia vuoto per non cambiare)
                    </span>
                  )}
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-blue-400"
                  required={!editingId}
                />
              </div>

              <fieldset className="border rounded p-4">
                <legend className="text-sm font-medium mb-2">Permessi</legend>
                {Object.keys(emptyPermissions).map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center gap-2 mb-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formData.permissions[perm as keyof Permissions]}
                      onChange={() =>
                        togglePermission(perm as keyof Permissions)
                      }
                    />
                    {permLabels[perm as keyof Permissions]}
                  </label>
                ))}
              </fieldset>

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

      {/* Tabella Utenti */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden max-h-[70vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Permessi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Data Creazione
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-100">
                    {user.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 max-w-[400px]">
                  {user.permissions
                    ? Object.entries(user.permissions)
                        .filter(([, val]) => val)
                        .map(([key]) => permLabels[key as keyof Permissions])
                        .join(", ")
                    : "Nessun permesso"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {permissions.manageUsers && (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-400 hover:text-blue-600 mr-3"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Nessun utente trovato
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
