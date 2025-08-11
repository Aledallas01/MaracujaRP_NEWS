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

const defaultPermissions: Permissions = {
  createSections: false,
  editSections: false,
  deleteSections: false,
  createNews: false,
  editNews: false,
  deleteNews: false,
  manageUsers: false,
};

interface User {
  id: string;
  username: string;
  password?: string; // solo per creazione/modifica, mai esposto
  permissions: Permissions;
  created_at: string;
  updated_at?: string;
}

const permLabels: Record<keyof Permissions, string> = {
  createSections: "Crea Sezioni",
  editSections: "Modifica Sezioni",
  deleteSections: "Elimina Sezioni",
  createNews: "Crea News",
  editNews: "Modifica News",
  deleteNews: "Elimina News",
  manageUsers: "Gestione Utenti",
};

const UsersManagement: React.FC = () => {
  const { permissions } = useAuth();

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
    permissions: defaultPermissions,
  });

  // Blocca accesso se non ha permessi manageUsers
  if (!permissions?.manageUsers) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Non hai i permessi per gestire gli utenti.
      </div>
    );
  }

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, username, permissions, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        // Assicuriamoci che permissions siano oggetti coerenti
        const usersParsed = data.map((u) => ({
          ...u,
          permissions: u.permissions || defaultPermissions,
        }));
        setUsers(usersParsed);
      }
    } catch (error) {
      console.error("Errore caricamento utenti:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      alert("Username è obbligatorio");
      return;
    }

    const userData: Partial<User> = {
      username: formData.username.trim(),
      permissions: formData.permissions,
      updated_at: new Date().toISOString(),
    };

    if (!editingId) {
      if (!formData.password.trim()) {
        alert("La password è obbligatoria per creare un nuovo utente.");
        return;
      }
      userData.password = formData.password;
    } else {
      if (formData.password.trim()) {
        userData.password = formData.password;
      }
    }

    try {
      if (editingId) {
        await supabase.from("users").update(userData).eq("id", editingId);
      } else {
        await supabase.from("users").insert([userData]);
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
      permissions: user.permissions || defaultPermissions,
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questo utente?")) return;
    try {
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
      permissions: defaultPermissions,
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestione Utenti</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nuovo Utente
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingId ? "Modifica Utente" : "Nuovo Utente"}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password{" "}
                  {editingId && (
                    <span className="text-xs text-gray-500">
                      (lascia vuoto per non cambiare)
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required={!editingId}
                />
              </div>

              <fieldset className="border rounded p-4">
                <legend className="text-sm font-medium text-gray-700 mb-2">
                  Permessi
                </legend>
                {Object.keys(defaultPermissions).map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center gap-2 mb-2 text-gray-700 text-sm"
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
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" />
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden max-h-[70vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permessi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data Creazione
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 max-w-[400px]">
                  {user.permissions
                    ? Object.entries(user.permissions)
                        .filter(([, val]) => val)
                        .map(([key]) => permLabels[key as keyof Permissions])
                        .join(", ")
                    : "Nessun permesso"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nessun utente trovato
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
