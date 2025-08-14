import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { supabase } from "../../lib/news";
import { useAuth } from "../../contexts/AuthContext";

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setMessageType(null);

    if (!username.trim()) {
      setMessage("Username non può essere vuoto.");
      setMessageType("error");
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
      setMessageType("success");
      setPassword("");
    } catch (error) {
      setMessage("Errore durante l'aggiornamento.");
      setMessageType("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="p-6 text-red-600 font-semibold text-center">
        Devi essere loggato per vedere questa pagina.
      </div>
    );
  }

  return (
    <div className="bg-[#2c2f4a] min-h-screen flex flex-col items-center justify-center text-gray-200 px-6">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-[#3a3f65] p-8 mt-[-40px]">
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-center">
          Il tuo Profilo
        </h2>

        {message && (
          <div
            className={`mb-6 rounded-md px-4 py-3 text-center font-medium ${
              messageType === "success"
                ? "bg-green-600 text-green-100"
                : "bg-red-600 text-red-100"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 font-semibold text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#262a4c] border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Inserisci il tuo username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-300"
            >
              Nuova password{" "}
              <span className="text-xs text-gray-400 font-normal">
                (lascia vuoto per non cambiare)
              </span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#262a4c] border border-gray-600 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Nuova password"
              autoComplete="new-password"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setUsername(currentUser.username);
                setPassword("");
                setMessage(null);
                setMessageType(null);
              }}
              disabled={loading}
              className="px-5 py-3 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-700 transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5" />
              {loading ? "Salvando..." : "Salva"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
