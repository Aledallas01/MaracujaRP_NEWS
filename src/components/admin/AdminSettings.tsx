// src/components/admin/AdminSettings.tsx

import React, { useState, useEffect, FormEvent } from "react";
import { InfoAPI } from "../../lib/api";
import {
  Check,
  X,
  Save,
  RefreshCw,
  Globe,
  Store,
  Eye,
  EyeOff,
  AlertTriangle,
  Info,
} from "lucide-react";

type MessageType = {
  type: "success" | "error" | "info";
  text: string;
};

const AdminSettings: React.FC = () => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [motd, setMotd] = useState("");
  const [footerMessage, setFooterMessage] = useState("");
  const [useURL, setUseURL] = useState(false);
  const [storeUrl, setStoreUrl] = useState("");
  const [isStoreAvailable, setIsStoreAvailable] = useState(false);
  const [unavailableStoreMessage, setUnavailableStoreMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState<MessageType | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Stato iniziale per confronto
  const [initialData, setInitialData] = useState({
    name: "",
    title: "",
    motd: "",
    footerMessage: "",
    useURL: false,
    storeUrl: "",
    isStoreAvailable: false,
    unavailableStoreMessage: "",
  });

  useEffect(() => {
    fetchInfo();
  }, []);

  // Controlla se ci sono modifiche
  useEffect(() => {
    const currentData = {
      name,
      title,
      motd,
      footerMessage,
      useURL,
      storeUrl,
      isStoreAvailable,
      unavailableStoreMessage,
    };

    const changed = JSON.stringify(currentData) !== JSON.stringify(initialData);
    setHasChanges(changed);
  }, [
    name,
    title,
    motd,
    footerMessage,
    useURL,
    storeUrl,
    isStoreAvailable,
    unavailableStoreMessage,
    initialData,
  ]);

  const fetchInfo = async () => {
    try {
      setInitialLoading(true);
      const infoData = await InfoAPI.getInfo();
      if (infoData.length > 0) {
        const info = infoData[0];
        const data = {
          name: info.name,
          title: info.title,
          motd: info.motd,
          footerMessage: info.footer_message,
          useURL: info.use_url,
          storeUrl: info.store_url,
          isStoreAvailable: info.store_available,
          unavailableStoreMessage: info.unavailablestoremessage,
        };

        setId(info.id);
        setName(data.name);
        setTitle(data.title);
        setMotd(data.motd);
        setFooterMessage(data.footerMessage);
        setUseURL(data.useURL);
        setStoreUrl(data.storeUrl);
        setIsStoreAvailable(data.isStoreAvailable);
        setUnavailableStoreMessage(data.unavailableStoreMessage);
        setInitialData(data);
      }
    } catch (error: any) {
      console.error("Errore durante il recupero delle info:", error.message);
      setMessage({
        type: "error",
        text: "Errore durante il caricamento delle impostazioni.",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const resetForm = () => {
    setName(initialData.name);
    setTitle(initialData.title);
    setMotd(initialData.motd);
    setFooterMessage(initialData.footerMessage);
    setUseURL(initialData.useURL);
    setStoreUrl(initialData.storeUrl);
    setIsStoreAvailable(initialData.isStoreAvailable);
    setUnavailableStoreMessage(initialData.unavailableStoreMessage);
    setMessage({ type: "info", text: "Modifiche annullate." });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!id) throw new Error("ID non disponibile");

      await InfoAPI.updateInfo(id, {
        name,
        title,
        motd,
        footer_message: footerMessage,
        use_url: useURL,
        store_url: storeUrl.startsWith("https://")
          ? storeUrl
          : storeUrl
          ? `https://${storeUrl}`
          : "",
        store_available: isStoreAvailable,
        unavailablestoremessage: unavailableStoreMessage,
      });

      // Aggiorna lo stato iniziale
      const newData = {
        name,
        title,
        motd,
        footerMessage,
        useURL,
        storeUrl,
        isStoreAvailable,
        unavailableStoreMessage,
      };
      setInitialData(newData);

      setMessage({
        type: "success",
        text: "Impostazioni aggiornate con successo!",
      });

      // Nascondi il messaggio dopo 3 secondi
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error(
        "Errore durante l'aggiornamento delle info:",
        error.message
      );
      setMessage({
        type: "error",
        text: "Errore durante l'aggiornamento delle impostazioni.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-teal-200">Caricamento impostazioni...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Impostazioni Generali
          </h2>
          <p className="text-teal-200">
            Configura le informazioni globali del sito e del negozio
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-700/50 text-teal-200 rounded-xl hover:bg-teal-600/50 transition-all border border-teal-400/30"
          >
            {showPreview ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span>{showPreview ? "Nascondi" : "Anteprima"}</span>
          </button>
          <button
            type="button"
            onClick={fetchInfo}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 text-gray-200 rounded-xl hover:bg-gray-600/50 transition-all border border-gray-400/30"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Ricarica</span>
          </button>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`rounded-xl p-4 border ${
            message.type === "success"
              ? "bg-green-500/20 border-green-400/30 text-green-300"
              : message.type === "error"
              ? "bg-red-500/20 border-red-400/30 text-red-300"
              : "bg-blue-500/20 border-blue-400/30 text-blue-300"
          }`}
        >
          <div className="flex items-center space-x-2">
            {message.type === "success" && <Check className="h-5 w-5" />}
            {message.type === "error" && <X className="h-5 w-5" />}
            {message.type === "info" && <Info className="h-5 w-5" />}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sezione Informazioni Generali */}
        <div className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-2xl border border-teal-400/30 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-xl shadow-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Informazioni Sito
              </h3>
              <p className="text-teal-200 text-sm">
                Configura nome, titolo e messaggi del sito
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-teal-100 mb-2"
              >
                Nome del Sito *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-emerald-900/50 border border-teal-500/30 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                placeholder="es. MaracujaRP"
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-teal-100 mb-2"
              >
                Titolo Pagina *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-emerald-900/50 border border-teal-500/30 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                placeholder="es. MaracujaRP Regolamento"
              />
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="motd"
                className="block text-sm font-medium text-teal-100 mb-2"
              >
                Messaggio del Giorno (MOTD) *
              </label>
              <input
                id="motd"
                type="text"
                value={motd}
                onChange={(e) => setMotd(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-emerald-900/50 border border-teal-500/30 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                placeholder="es. Benvenuto nel regolamento!"
              />
              <p className="text-xs text-teal-300 mt-1">
                Mostrato nell'header del sito
              </p>
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="footerMessage"
                className="block text-sm font-medium text-teal-100 mb-2"
              >
                Messaggio Footer *
              </label>
              <textarea
                id="footerMessage"
                value={footerMessage}
                onChange={(e) => setFooterMessage(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-emerald-900/50 border border-teal-500/30 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all resize-none"
                placeholder="es. Una comunità roleplay dedicata al divertimento..."
              />
              <p className="text-xs text-teal-300 mt-1">
                Mostrato nel footer del sito
              </p>
            </div>
          </div>
        </div>

        {/* Sezione Store */}
        <div className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-2xl border border-teal-400/30 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl shadow-lg">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Configurazione Store
              </h3>
              <p className="text-teal-200 text-sm">
                Gestisci disponibilità e URL del negozio
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Store Available Toggle */}
            <div className="flex items-center justify-between p-4 bg-teal-700/30 rounded-xl border border-teal-400/20">
              <div>
                <h4 className="text-white font-medium">Negozio Disponibile</h4>
                <p className="text-teal-300 text-sm">
                  Abilita o disabilita l'accesso al negozio
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`text-sm font-medium ${
                    isStoreAvailable ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {isStoreAvailable ? "Attivo" : "Disattivo"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsStoreAvailable(!isStoreAvailable)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${
                    isStoreAvailable ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isStoreAvailable ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Use URL Toggle */}
            <div className="flex items-center justify-between p-4 bg-teal-700/30 rounded-xl border border-teal-400/20">
              <div>
                <h4 className="text-white font-medium">Usa URL Esterno</h4>
                <p className="text-teal-300 text-sm">
                  Reindirizza a un sito esterno invece della pagina interna
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`text-sm font-medium ${
                    useURL ? "text-blue-300" : "text-gray-300"
                  }`}
                >
                  {useURL ? "URL Esterno" : "Pagina Interna"}
                </span>
                <button
                  type="button"
                  onClick={() => setUseURL(!useURL)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${
                    useURL ? "bg-blue-500" : "bg-gray-500"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      useURL ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Store URL */}
            <div>
              <label
                htmlFor="storeUrl"
                className="block text-sm font-medium text-teal-100 mb-2"
              >
                URL del Negozio
              </label>
              <div className="relative">
                <input
                  id="storeUrl"
                  type="text"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-emerald-900/50 border border-teal-500/30 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  placeholder="es. shop.maracujaroleplay.it"
                />
                {!storeUrl.startsWith("https://") && storeUrl && (
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-teal-400 text-sm">https://</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-teal-300 mt-1">
                {useURL
                  ? "URL utilizzato per il reindirizzamento"
                  : "URL mostrato come riferimento"}
              </p>
            </div>

            {/* Unavailable Message */}
            <div>
              <label
                htmlFor="unavailableStoreMessage"
                className="block text-sm font-medium text-teal-100 mb-2"
              >
                Messaggio Store Non Disponibile
              </label>
              <textarea
                id="unavailableStoreMessage"
                value={unavailableStoreMessage}
                onChange={(e) => setUnavailableStoreMessage(e.target.value)}
                required
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-emerald-900/50 border border-teal-500/30 text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all resize-none"
                placeholder="es. Il negozio non è disponibile al momento."
              />
              <p className="text-xs text-teal-300 mt-1">
                Mostrato quando il negozio è disabilitato
              </p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm rounded-2xl border border-purple-400/30 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Anteprima Impostazioni
                </h3>
                <p className="text-purple-200 text-sm">
                  Come appariranno le tue impostazioni
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-400/20">
                  <h4 className="text-purple-200 font-medium mb-2">Header</h4>
                  <div className="text-white font-bold">
                    {name || "Nome Sito"}
                  </div>
                  <div className="text-purple-300 text-sm">
                    {motd || "Messaggio del giorno"}
                  </div>
                </div>

                <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-400/20">
                  <h4 className="text-purple-200 font-medium mb-2">
                    Titolo Pagina
                  </h4>
                  <div className="text-white">
                    {title || "Titolo della pagina"}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-400/20">
                  <h4 className="text-purple-200 font-medium mb-2">
                    Store Status
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isStoreAvailable ? "bg-green-400" : "bg-red-400"
                      }`}
                    ></div>
                    <span className="text-white">
                      {isStoreAvailable ? "Disponibile" : "Non Disponibile"}
                    </span>
                  </div>
                  {useURL && storeUrl && (
                    <div className="text-blue-300 text-sm mt-1">
                      →{" "}
                      {storeUrl.startsWith("https://")
                        ? storeUrl
                        : `https://${storeUrl}`}
                    </div>
                  )}
                </div>

                <div className="bg-purple-700/30 rounded-xl p-4 border border-purple-400/20">
                  <h4 className="text-purple-200 font-medium mb-2">Footer</h4>
                  <div className="text-white text-sm">
                    {footerMessage || "Messaggio del footer"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-teal-400/30">
          <div className="flex items-center space-x-2">
            {hasChanges && (
              <div className="flex items-center space-x-2 text-amber-300">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Modifiche non salvate</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {hasChanges && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-700/50 text-gray-200 rounded-xl hover:bg-gray-600/50 transition-all border border-gray-400/30"
              >
                Annulla Modifiche
              </button>
            )}

            <button
              type="submit"
              disabled={loading || !id || !hasChanges}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl text-white font-semibold transition-all shadow-lg ${
                loading || !id || !hasChanges
                  ? "bg-gray-600/50 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 hover:scale-105"
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Salva Impostazioni</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
