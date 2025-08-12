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
  password?: string;
  created_at: string;
  updated_at?: string;
  permissions: Permissions;
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
  const { currentUser } = useAuth();
  const permissions = currentUser?.permissions ?? emptyPermissions;

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
    permissions: { ...emptyPermissions },
  });

  if (!permissions.manageUsers) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E1F2F] p-8 text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 mb-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
          />
        </svg>
        <h1 className="text-2xl font-semibold mb-2">Accesso Negato</h1>
        <p className="text-center max-w-sm text-gray-400">
          Non hai i permessi necessari per gestire gli utenti.
        </p>
      </div>
    );
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          id,
          username,
          password,
          created_at,
          updated_at,
          God,
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
        const usersWithPermissions: User[] = data
          .filter((u: any) => !u.God)
          .map((u: any) => ({
            id: u.id,
            username: u.username,
            password: u.password,
            created_at: u.created_at,
            updated_at: u.updated_at,
            God: u.God,
            permissions: u.permission
              ? {
                  createSections: u.permission.createSections || false,
                  editSections: u.permission.editSections || false,
                  deleteSections: u.permission.deleteSections || false,
                  createNews: u.permission.createNews || false,
                  editNews: u.permission.editNews || false,
                  deleteNews: u.permission.deleteNews || false,
                  manageUsers: u.permission.manageUsers || false,
                }
              : { ...emptyPermissions },
          }));

        setUsers(usersWithPermissions);
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
      alert("Inserisci un username.");
      return;
    }

    try {
      if (editingId) {
        // Modifica utente
        const userUpdate: any = {
          username: formData.username,
          updated_at: new Date().toISOString(),
        };

        if (formData.password.trim()) {
          userUpdate.password = formData.password;
        }

        await supabase.from("users").update(userUpdate).eq("id", editingId);

        await supabase.from("permission").upsert(
          {
            user_id: editingId,
            ...formData.permissions,
          },
          { onConflict: "user_id" }
        );
      } else {
        // Creazione nuovo utente
        if (!formData.password.trim()) {
          alert("La password è obbligatoria per creare un nuovo utente.");
          return;
        }

        const { data: insertData, error: insertError } = await supabase
          .from("users")
          .insert([
            {
              username: formData.username,
              password: formData.password,
              created_at: new Date().toISOString(),
            },
          ])
          .select("id")
          .single();

        if (insertError || !insertData) {
          alert("Errore creazione utente.");
          return;
        }

        await supabase.from("permission").insert([
          {
            user_id: insertData.id,
            ...formData.permissions,
          },
        ]);
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
      permissions: { ...user.permissions },
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questo utente?")) return;

    try {
      await supabase.from("permission").delete().eq("user_id", id);
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
      permissions: { ...emptyPermissions },
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
    <div className="bg-[#1E1F2F] min-h-screen p-8 text-gray-300 flex flex-col">
      <header className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-white">Gestione Utenti</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-indigo-600 px-5 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          <Plus className="h-5 w-5" />
          Nuovo Utente
        </button>
      </header>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center pt-20 z-50 overflow-auto">
          <div className="bg-[#2A2E47] rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto text-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold">
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

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Inserisci username"
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
                    <span className="text-xs text-gray-500 italic">
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
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={
                    editingId
                      ? "Nuova password (opzionale)"
                      : "Inserisci password"
                  }
                  required={!editingId}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Permessi
                </label>
                <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border border-gray-600 rounded-md p-3 bg-gray-900">
                  {Object.entries(permLabels).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions[key as keyof Permissions]}
                        onChange={() =>
                          togglePermission(key as keyof Permissions)
                        }
                        className="w-4 h-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-3 text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-3 bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition text-white font-semibold"
                >
                  <Save className="h-5 w-5" />
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabella utenti */}
      <div className="bg-[#2A2E47] rounded-xl shadow-lg overflow-hidden flex-grow mt-6 max-h-[70vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-700 table-auto">
          <thead className="bg-[#3B4060]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Username
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Data Creazione
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className={`${
                  idx % 2 === 0 ? "bg-[#33385A]" : "bg-[#2A2E47]"
                } hover:bg-indigo-600 transition-colors cursor-pointer`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-100 font-medium">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-indigo-400 hover:text-indigo-300"
                    aria-label={`Modifica ${user.username}`}
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-600"
                    aria-label={`Elimina ${user.username}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-medium">
            Nessun utente trovato
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
