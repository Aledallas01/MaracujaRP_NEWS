import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/AuthContext";

const Profile: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Nuova password
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    fetchUserData();
  }, [currentUser]);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("id", currentUser?.id)
        .single();

      if (error) throw error;
      if (data) setUsername(data.username);
    } catch (err: any) {
      setError("Errore nel recuperare i dati utente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setError(null);
    setSuccessMsg(null);

    if (!username.trim()) {
      setError("Username non può essere vuoto.");
      return;
    }
    if (password && password.length < 6) {
      setError("La password deve essere di almeno 6 caratteri.");
      return;
    }

    setSaving(true);
    try {
      const updates: any = { username };
      if (password) updates.password = password; // ⚠️ come prima, in produzione hashare!

      const { error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", currentUser?.id);

      if (error) throw error;

      setSuccessMsg("Profilo aggiornato con successo!");
      setPassword("");
    } catch (err: any) {
      setError("Errore durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="p-6 text-gray-200">
        <p>Devi essere loggato per accedere al profilo.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center text-gray-200">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div
      className="p-6 max-w-md mx-auto"
      style={{ backgroundColor: "#30334E" }}
    >
      <h1 className="text-2xl font-bold text-white mb-6">Il tuo Profilo</h1>

      {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}
      {successMsg && (
        <div className="mb-4 text-green-400 font-semibold">{successMsg}</div>
      )}

      <label className="block mb-2 text-gray-300 font-medium">Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <label className="block mb-2 text-gray-300 font-medium">
        Nuova Password (lascia vuoto per non cambiare)
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Almeno 6 caratteri"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full py-2 rounded text-white font-semibold transition-colors ${
          saving
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {saving ? "Salvando..." : "Salva"}
      </button>

      <button
        onClick={logout}
        className="mt-4 w-full py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
