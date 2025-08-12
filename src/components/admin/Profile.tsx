import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

const Profile: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!username.trim()) {
      setMessage("Username non può essere vuoto.");
      setLoading(false);
      return;
    }

    try {
      const updateData: any = {
        username: username.trim(),
      };

      if (password.trim()) {
        updateData.password = password.trim();
      }

      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", currentUser?.id);

      if (error) throw error;

      setMessage("Profilo aggiornato con successo.");
      setPassword("");
    } catch (error) {
      setMessage("Errore durante l'aggiornamento.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Devi essere loggato per vedere questa pagina.
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#30334E] min-h-full text-gray-200 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Il tuo Profilo</h2>
        <button
          onClick={logout}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Logout
        </button>
      </div>

      {message && (
        <div className="mb-4 text-center text-sm text-blue-400">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Nuova password{" "}
            <span className="text-xs text-gray-400">
              (lascia vuoto per non cambiare)
            </span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Salva
          </button>
          <button
            type="button"
            onClick={() => {
              setUsername(currentUser.username);
              setPassword("");
              setMessage(null);
            }}
            className="px-4 py-2 text-gray-400 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Annulla
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
