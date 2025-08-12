import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const Profile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const user = supabase.auth.user();

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("username")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setUsername(data.username);
        }
      } catch (error: any) {
        setMessage({
          type: "error",
          text: error.message || "Errore nel caricamento dati",
        });
      }
    };

    fetchUserData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password && password !== passwordConfirm) {
      setMessage({ type: "error", text: "Le password non corrispondono." });
      return;
    }

    setLoading(true);
    try {
      const updates: any = { username };

      if (password) {
        updates.password = password; // Attenzione: in chiaro
      }

      const { error } = await supabase
        .from("users")
        .update(updates)
        .eq("user_id", user?.id);

      if (error) throw error;

      setMessage({ type: "success", text: "Profilo aggiornato con successo!" });
      setPassword("");
      setPasswordConfirm("");
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Errore nell'aggiornamento.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-gray-100" style={{ backgroundColor: "#30334E" }}>
        <p>Devi essere autenticato per vedere questa pagina.</p>
      </div>
    );
  }

  return (
    <div
      className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg text-gray-100"
      style={{ backgroundColor: "#30334E" }}
    >
      <h1 className="text-2xl font-bold mb-6">Profilo utente</h1>

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            message.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {message.text}
        </div>
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
            className="w-full rounded px-3 py-2 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Nuova Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded px-3 py-2 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Lascia vuoto per non cambiare"
          />
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="block mb-1 font-medium">
            Conferma Password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full rounded px-3 py-2 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Conferma nuova password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salva"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
