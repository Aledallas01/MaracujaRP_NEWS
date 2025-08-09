// src/components/admin/StoreSettings.tsx

import React, { useState, useEffect } from "react";
import { StorePackagesAPI, StoreSectionsAPI } from "../../lib/api";
import { Package, StoreSection } from "../../types/index";
import {
  Plus,
  Pencil,
  Trash2,
  Package as PackageIcon,
  Folder,
} from "lucide-react";

const StoreSettings: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [sections, setSections] = useState<StoreSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"packages" | "sections">(
    "packages"
  );

  // Package Modal State
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [packageFormData, setPackageFormData] = useState({
    nome: "",
    descrizione: "",
    immagine: "",
    prezzo: 0,
    section_id: "",
  });

  // Section Modal State
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<StoreSection | null>(
    null
  );
  const [sectionFormData, setSectionFormData] = useState({
    nome: "",
    descrizione: "",
    order_index: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [packagesData, sectionsData] = await Promise.all([
        StorePackagesAPI.getInfo(),
        StoreSectionsAPI.getSections(),
      ]);
      setPackages(packagesData);
      setSections(sectionsData);
    } catch {
      setError("Errore durante il caricamento dei dati.");
    } finally {
      setLoading(false);
    }
  };

  // Package Functions
  const openPackageModal = (pkg?: Package) => {
    if (pkg) {
      setEditingPackage(pkg);
      setPackageFormData({
        nome: pkg.nome,
        descrizione: pkg.descrizione,
        immagine: pkg.immagine || "",
        prezzo: pkg.prezzo,
        section_id: pkg.section_id || "",
      });
    } else {
      setEditingPackage(null);
      setPackageFormData({
        nome: "",
        descrizione: "",
        immagine: "",
        prezzo: 0,
        section_id: "",
      });
    }
    setIsPackageModalOpen(true);
  };

  const closePackageModal = () => {
    setIsPackageModalOpen(false);
    setEditingPackage(null);
  };

  const submitPackageForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        await StorePackagesAPI.updatePackage(editingPackage.id, {
          ...packageFormData,
          section_id: packageFormData.section_id || undefined,
        });
      } else {
        await StorePackagesAPI.createPackage({
          ...packageFormData,
          section_id: packageFormData.section_id || undefined,
        });
      }
      await fetchData();
      closePackageModal();
    } catch {
      setError("Errore durante il salvataggio del pacchetto.");
    }
  };

  const deletePackage = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questo pacchetto?")) return;
    try {
      await StorePackagesAPI.deletePackage(id);
      await fetchData();
    } catch {
      setError("Errore eliminazione pacchetto.");
    }
  };

  // Section Functions
  const openSectionModal = (section?: StoreSection) => {
    if (section) {
      setEditingSection(section);
      setSectionFormData({
        nome: section.nome,
        descrizione: section.descrizione || "",
        order_index: section.order_index,
      });
    } else {
      setEditingSection(null);
      setSectionFormData({
        nome: "",
        descrizione: "",
        order_index: sections.length,
      });
    }
    setIsSectionModalOpen(true);
  };

  const closeSectionModal = () => {
    setIsSectionModalOpen(false);
    setEditingSection(null);
  };

  const submitSectionForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSection) {
        await StoreSectionsAPI.updateSection(
          editingSection.id,
          sectionFormData
        );
      } else {
        await StoreSectionsAPI.createSection(sectionFormData);
      }
      await fetchData();
      closeSectionModal();
    } catch {
      setError("Errore durante il salvataggio della sezione.");
    }
  };

  const deleteSection = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questa sezione?")) return;
    try {
      await StoreSectionsAPI.deleteSection(id);
      await fetchData();
    } catch {
      setError("Errore eliminazione sezione.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestione Store</h2>
          <p className="text-teal-200">
            Gestisci prodotti e sezioni del negozio
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-teal-800/30 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("packages")}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all ${
            activeTab === "packages"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
              : "text-teal-200 hover:text-white hover:bg-teal-700/50"
          }`}
        >
          <PackageIcon className="h-5 w-5" />
          <span>Prodotti ({packages.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("sections")}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all ${
            activeTab === "sections"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
              : "text-teal-200 hover:text-white hover:bg-teal-700/50"
          }`}
        >
          <Folder className="h-5 w-5" />
          <span>Sezioni ({sections.length})</span>
        </button>
      </div>

      {/* Packages Tab */}
      {activeTab === "packages" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Prodotti</h3>
            <button
              onClick={() => openPackageModal()}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Aggiungi Prodotto</span>
            </button>
          </div>

          {/* Prodotti senza sezione */}
          {packages.filter((pkg) => !pkg.section_id).length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-teal-400/30">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center shadow-lg">
                  <PackageIcon className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white">
                  Prodotti senza sezione
                </h4>
                <span className="bg-gray-500/20 px-3 py-1 rounded-full border border-gray-400/30">
                  <span className="text-gray-200 text-sm font-medium">
                    {packages.filter((pkg) => !pkg.section_id).length} prodotti
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages
                  .filter((pkg) => !pkg.section_id)
                  .map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-gradient-to-br from-emerald-700/40 to-teal-700/40 backdrop-blur-sm border border-teal-400/30 rounded-xl p-4 flex flex-col shadow-lg"
                    >
                      <div className="aspect-w-1 aspect-h-1 mb-3 overflow-hidden rounded-lg">
                        <img
                          src={pkg.immagine || "/logo.png"}
                          alt={pkg.nome}
                          className="object-cover w-full h-32"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/logo.png";
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-semibold text-orange-200 mb-2 text-sm">
                          {pkg.nome}
                        </h3>
                        <p className="text-teal-200 text-xs mb-3 line-clamp-2">
                          {pkg.descrizione}
                        </p>
                        <div className="mt-auto">
                          <p className="text-lg font-bold text-orange-300 mb-3">
                            €{pkg.prezzo.toFixed(2)}
                          </p>
                          <div className="flex gap-2">
                            <button
                              className="flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 bg-teal-600/50 text-teal-200 rounded-lg hover:bg-teal-500/50 transition-all text-xs"
                              onClick={() => openPackageModal(pkg)}
                            >
                              <Pencil className="h-3 w-3" />
                              <span>Modifica</span>
                            </button>
                            <button
                              className="flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 bg-red-600/50 text-red-200 rounded-lg hover:bg-red-500/50 transition-all text-xs"
                              onClick={() => deletePackage(pkg.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Elimina</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Prodotti divisi per sezione */}
          {sections.map((section) => {
            const sectionPackages = packages.filter(
              (pkg) => pkg.section_id === section.id
            );
            if (sectionPackages.length === 0) return null;

            return (
              <div key={section.id} className="space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-teal-400/30">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Folder className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {section.nome}
                  </h4>
                  <span className="bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/30">
                    <span className="text-orange-200 text-sm font-medium">
                      {sectionPackages.length} prodotti
                    </span>
                  </span>
                </div>
                {section.descrizione && (
                  <p className="text-teal-200 text-sm mb-4 pl-11">
                    {section.descrizione}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sectionPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-gradient-to-br from-emerald-700/40 to-teal-700/40 backdrop-blur-sm border border-teal-400/30 rounded-xl p-4 flex flex-col shadow-lg"
                    >
                      <div className="aspect-w-1 aspect-h-1 mb-3 overflow-hidden rounded-lg">
                        <img
                          src={pkg.immagine || "/logo.png"}
                          alt={pkg.nome}
                          className="object-cover w-full h-32"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/logo.png";
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-semibold text-orange-200 mb-2 text-sm">
                          {pkg.nome}
                        </h3>
                        <p className="text-teal-200 text-xs mb-3 line-clamp-2">
                          {pkg.descrizione}
                        </p>
                        <div className="mt-auto">
                          <p className="text-lg font-bold text-orange-300 mb-3">
                            €{pkg.prezzo.toFixed(2)}
                          </p>
                          <div className="flex gap-2">
                            <button
                              className="flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 bg-teal-600/50 text-teal-200 rounded-lg hover:bg-teal-500/50 transition-all text-xs"
                              onClick={() => openPackageModal(pkg)}
                            >
                              <Pencil className="h-3 w-3" />
                              <span>Modifica</span>
                            </button>
                            <button
                              className="flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 bg-red-600/50 text-red-200 rounded-lg hover:bg-red-500/50 transition-all text-xs"
                              onClick={() => deletePackage(pkg.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span>Elimina</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Messaggio se non ci sono prodotti */}
          {packages.length === 0 && (
            <div className="text-center py-12 bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30">
              <PackageIcon className="h-12 w-12 text-teal-300 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-teal-200 mb-2">
                Nessun prodotto disponibile
              </h3>
              <p className="text-teal-300 mb-4">
                Inizia creando il primo prodotto per il tuo store.
              </p>
              <button
                onClick={() => openPackageModal()}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
              >
                Crea Primo Prodotto
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sections Tab */}
      {activeTab === "sections" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">Sezioni</h3>
            <button
              onClick={() => openSectionModal()}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Aggiungi Sezione</span>
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {section.nome}
                      </h4>
                      {section.descrizione && (
                        <p className="text-teal-200 text-sm">
                          {section.descrizione}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-teal-600/50 text-teal-200 px-2 py-1 rounded-full">
                      {
                        packages.filter((p) => p.section_id === section.id)
                          .length
                      }{" "}
                      prodotti
                    </span>
                    <button
                      onClick={() => openSectionModal(section)}
                      className="p-2 text-teal-300 hover:text-blue-300 hover:bg-teal-700/50 rounded-lg transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="p-2 text-teal-300 hover:text-red-300 hover:bg-teal-700/50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Package Modal */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-gradient-to-br from-teal-800/95 to-emerald-800/95 backdrop-blur-xl rounded-2xl border border-teal-400/40 w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-teal-400/30">
              <h2 className="text-xl font-bold text-white">
                {editingPackage ? "Modifica Prodotto" : "Nuovo Prodotto"}
              </h2>
              <button
                onClick={closePackageModal}
                className="p-2 rounded-xl text-teal-200 hover:text-white hover:bg-teal-700/50 transition-all"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitPackageForm} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-teal-200 mb-2">
                        Nome Prodotto *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        value={packageFormData.nome}
                        required
                        placeholder="Inserisci il nome del prodotto"
                        onChange={(e) =>
                          setPackageFormData({
                            ...packageFormData,
                            nome: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal-200 mb-2">
                        Prezzo (€) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                        value={packageFormData.prezzo}
                        required
                        placeholder="0.00"
                        onChange={(e) =>
                          setPackageFormData({
                            ...packageFormData,
                            prezzo: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal-200 mb-2">
                      Sezione
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                      value={packageFormData.section_id}
                      onChange={(e) =>
                        setPackageFormData({
                          ...packageFormData,
                          section_id: e.target.value,
                        })
                      }
                    >
                      <option value="">Nessuna sezione</option>
                      {sections.map((section) => (
                        <option key={section.id} value={section.id}>
                          {section.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal-200 mb-2">
                      URL Immagine
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                      value={packageFormData.immagine}
                      placeholder="https://esempio.com/immagine.jpg"
                      onChange={(e) =>
                        setPackageFormData({
                          ...packageFormData,
                          immagine: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal-200 mb-2">
                      Descrizione
                    </label>
                    <textarea
                      className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all resize-none"
                      value={packageFormData.descrizione}
                      onChange={(e) =>
                        setPackageFormData({
                          ...packageFormData,
                          descrizione: e.target.value,
                        })
                      }
                      rows={4}
                      placeholder="Descrivi il prodotto..."
                    />
                  </div>
                </div>

                {/* Right Column - Image Preview */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-teal-200 mb-2">
                    Anteprima Immagine
                  </label>
                  <div className="flex-1 bg-teal-800/30 rounded-xl border border-teal-400/30 p-6 flex items-center justify-center min-h-[400px]">
                    {packageFormData.immagine ? (
                      <img
                        src={packageFormData.immagine}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/logo.png";
                        }}
                      />
                    ) : (
                      <div className="text-center text-teal-300">
                        <PackageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Inserisci un URL per vedere l'anteprima</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-teal-400/30">
                <button
                  type="button"
                  className="px-6 py-3 bg-teal-700/50 text-teal-200 rounded-xl hover:bg-teal-600/50 transition-all border border-teal-400/30"
                  onClick={closePackageModal}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
                >
                  {editingPackage ? "Aggiorna Prodotto" : "Crea Prodotto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Section Modal */}
      {isSectionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-gradient-to-br from-teal-800/95 to-emerald-800/95 backdrop-blur-xl rounded-2xl border border-teal-400/40 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-teal-400/30">
              <h2 className="text-xl font-bold text-white">
                {editingSection ? "Modifica Sezione" : "Nuova Sezione"}
              </h2>
              <button
                onClick={closeSectionModal}
                className="p-2 rounded-xl text-teal-200 hover:text-white hover:bg-teal-700/50 transition-all"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitSectionForm} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-teal-200 mb-2">
                  Nome Sezione *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  value={sectionFormData.nome}
                  required
                  placeholder="Inserisci il nome della sezione"
                  onChange={(e) =>
                    setSectionFormData({
                      ...sectionFormData,
                      nome: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-200 mb-2">
                  Descrizione
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all resize-none"
                  value={sectionFormData.descrizione}
                  onChange={(e) =>
                    setSectionFormData({
                      ...sectionFormData,
                      descrizione: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Descrizione opzionale..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-200 mb-2">
                  Ordine
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  value={sectionFormData.order_index}
                  onChange={(e) =>
                    setSectionFormData({
                      ...sectionFormData,
                      order_index: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-3 bg-teal-700/50 text-teal-200 rounded-xl hover:bg-teal-600/50 transition-all border border-teal-400/30"
                  onClick={closeSectionModal}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
                >
                  {editingSection ? "Aggiorna Sezione" : "Crea Sezione"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreSettings;
