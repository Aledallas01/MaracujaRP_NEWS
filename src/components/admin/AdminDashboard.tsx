// src/components/admin/AdminDashboard.tsx

import React, { useState, useEffect } from "react";
import { News, NewsSection, AdminUser } from "../../types";

interface AdminDashboardProps {
  currentAdmin: AdminUser;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentAdmin,
  onLogout,
}) => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carica le news dal client (anon key)
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error("Errore nel caricamento delle news");
      const data: News[] = await res.json();
      setNews(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // POST o PUT o DELETE verso /api/news (serverless API con Service Role Key)
  const modifyNews = async (
    method: "POST" | "PUT" | "DELETE",
    body: any
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/news", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Errore API");
      }
      await fetchNews();
      return true;
    } catch (e: any) {
      alert(e.message);
      return false;
    }
  };

  const handleAddNews = async () => {
    const title = prompt("Titolo nuova news");
    if (!title) return;
    const content = prompt("Contenuto della news");
    if (!content) return;
    const sectionId = prompt("ID sezione (es. 'default')");
    if (!sectionId) return;

    await modifyNews("POST", { sectionId, title, content, orderIndex: 0 });
  };

  const handleUpdateNews = async (item: News) => {
    const title = prompt("Modifica titolo", item.title);
    if (!title) return;
    const content = prompt("Modifica contenuto", item.content);
    if (!content) return;

    await modifyNews("PUT", {
      id: item.id,
      title,
      content,
      orderIndex: item.orderIndex,
      sectionId: undefined,
    });
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Sei sicuro di eliminare questa news?")) return;
    await modifyNews("DELETE", { id });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard - News</h1>
        <button
          onClick={onLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </header>

      <button
        onClick={handleAddNews}
        className="mb-6 bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Aggiungi Nuova News
      </button>

      {loading && <p>Caricamento...</p>}
      {error && <p className="text-red-500">Errore: {error}</p>}

      <ul className="space-y-4">
        {news.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-gray-800 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-sm text-gray-300">{item.content}</p>
              <p className="text-xs text-gray-500">
                Ordine: {item.orderIndex} - ID Sezione: {item.createdBy ?? "-"}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleUpdateNews(item)}
                className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Modifica
              </button>
              <button
                onClick={() => handleDeleteNews(item.id)}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Elimina
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
