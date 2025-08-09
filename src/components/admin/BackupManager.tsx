// src/components/admin/BackupManager.tsx

import React, { useState, useEffect } from "react";
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { RuleSection } from "../../types";
import { rulesAPI, sectionsAPI, backupAPI } from "../../lib/api";

interface BackupMeta {
  id: string;
  name: string;
  type: "auto" | "manual";
  status: "completed" | "failed" | "in_progress";
  created_at: string;
}

interface BackupManagerProps {
  sections: RuleSection[];
  onRestoreSections: (sections: RuleSection[]) => void;
  refreshSections: () => void;
}

const BackupManager: React.FC<BackupManagerProps> = ({
  sections,
  refreshSections,
}) => {
  const [backups, setBackups] = useState<BackupMeta[]>([]);
  const [backupName, setBackupName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const { meta } = await backupAPI.listBackups();
      setBackups(meta);
    } catch (err) {
      console.error("Errore fetch backup list:", err);
      alert("Errore caricamento cronologia backup");
    }
  };

  const createManual = async () => {
    if (!backupName.trim()) return;
    setIsCreating(true);
    try {
      await backupAPI.createBackup(backupName, "manual", sections);
      setBackupName("");
      fetchList();
      refreshSections();
    } catch (err) {
      console.error("Errore creazione backup:", err);
      alert("Backup fallito");
    } finally {
      setIsCreating(false);
    }
  };

  const downloadBackup = async (id: string, name: string) => {
    try {
      const data = await backupAPI.fetchBackupData(id);
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-${name}-${data.length}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Errore download backup:", err);
      alert("Download fallito");
    }
  };

  const restoreBackup = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Ripristinare backup "${name}"? Sovrascriverà i dati correnti.`
      )
    )
      return;

    try {
      const data = await backupAPI.fetchBackupData(id);
      const restoredSections = data as RuleSection[];

      await sectionsAPI.deleteAllSections();

      for (const section of restoredSections) {
        const createdSection = await sectionsAPI.createSection(
          JSON.stringify({
            title: section.title,
            description: section.description,
            icon: section.icon,
            index: section.orderIndex,
          })
        );

        for (const rule of section.rules) {
          await rulesAPI.createRule({
            sectionId: createdSection.id,
            title: rule.title,
            content: rule.content,
            orderIndex: rule.orderIndex,
          });
        }
      }

      refreshSections();
      alert("Ripristino completato con successo!");
    } catch (err) {
      console.error("Errore restore backup:", err);
      alert("Ripristino fallito");
    }
  };

  const renderStatusIcon = (status: BackupMeta["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-300" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-300" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-300 animate-spin" />;
    }
  };

  const renderStatusBadge = (status: string) => {
    const cfg: Record<string, { label: string; color: string }> = {
      completed: {
        label: "Completato",
        color: "bg-green-500/20 text-green-300 border-green-400/30",
      },
      failed: {
        label: "Fallito",
        color: "bg-red-500/20 text-red-300 border-red-400/30",
      },
      in_progress: {
        label: "In Corso",
        color: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
      },
    };
    const c = cfg[status] || cfg.completed;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${c.color}`}
      >
        {c.label}
      </span>
    );
  };

  const renderTypeBadge = (type: BackupMeta["type"]) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        type === "auto"
          ? "bg-blue-500/20 text-blue-300 border-blue-400/30"
          : "bg-orange-500/20 text-orange-300 border-orange-400/30"
      }`}
    >
      {type === "auto" ? "Automatico" : "Manuale"}
    </span>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestione Backup</h2>
          <p className="text-teal-200">Backup su DataBase</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 p-6 rounded-xl border border-teal-400/30">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">Fai un Backup</h3>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
          <input
            type="text"
            value={backupName}
            onChange={(e) => setBackupName(e.target.value)}
            disabled={isCreating}
            placeholder="Nome backup"
            className="flex-1 bg-teal-700/50 border border-teal-400/30 px-4 py-3 rounded-lg text-white"
          />
          <button
            onClick={createManual}
            disabled={!backupName.trim() || isCreating}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-lg disabled:opacity-50"
          >
            {isCreating ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Database className="h-5 w-5" />
            )}
            <span>{isCreating ? "Creazione..." : "Crea Backup"}</span>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 rounded-xl border border-teal-400/30 overflow-x-auto">
        <h3 className="text-xl font-bold text-white p-6 border-b border-teal-400/30">
          Cronologia Backup
        </h3>
        <table className="w-full">
          <thead className="bg-teal-700/50 text-orange-200 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">Data</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Stato</th>
              <th className="px-4 py-3">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-400/20">
            {backups.map((b) => (
              <tr key={b.id} className="hover:bg-teal-700/30 transition-colors">
                <td className="px-4 py-3 text-white">{b.name}</td>
                <td className="px-4 py-3 text-teal-300">
                  {new Date(b.created_at).toLocaleString("it-IT")}
                </td>
                <td className="px-4 py-3">{renderTypeBadge(b.type)}</td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  {renderStatusIcon(b.status)}
                  {renderStatusBadge(b.status)}
                </td>
                <td className="px-4 py-3 text-teal-300">
                  <button
                    onClick={() => downloadBackup(b.id, b.name)}
                    title="Scarica"
                  >
                    <Download className="h-5 w-5 hover:text-blue-300" />
                  </button>
                  {b.status === "completed" && (
                    <button
                      onClick={() => restoreBackup(b.id, b.name)}
                      title="Ripristina"
                    >
                      <Upload className="h-5 w-5 hover:text-orange-300" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BackupManager;
