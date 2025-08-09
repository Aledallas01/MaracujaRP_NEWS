// src/components/admin/DiscountsManager.tsx

import { useState, useEffect } from "react";
import { DiscountAPI, StorePackagesAPI } from "../../lib/api";
import { Discount, Package } from "../../types";
import {
  Plus,
  Trash2,
  Calendar,
  Package as PackageIcon,
  Percent,
  AlertCircle,
  Infinity,
} from "lucide-react";

export default function DiscountsManager() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    productId: "",
    percentage: 0,
    expiresAt: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [discountsData, packagesData] = await Promise.all([
        DiscountAPI.getAllDiscounts(),
        StorePackagesAPI.getInfo(),
      ]);

      setDiscounts(discountsData);
      setPackages(packagesData);
    } catch (err) {
      setError("Errore nel caricamento dei dati.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiscount = async () => {
    if (
      !formData.productId ||
      formData.percentage <= 0 ||
      formData.percentage > 100
    ) {
      setError(
        "Seleziona un prodotto e inserisci una percentuale valida (1-100)."
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Il nome del prodotto viene recuperato automaticamente dall'API
      await DiscountAPI.createDiscount({
        productId: formData.productId,
        percentage: formData.percentage,
        expiresAt: formData.expiresAt || undefined,
      });

      setFormData({ productId: "", percentage: 0, expiresAt: "" });
      setIsFormOpen(false);
      await fetchData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Errore durante la creazione dello sconto."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDiscount = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questo sconto?")) return;

    setLoading(true);
    try {
      await DiscountAPI.deleteDiscount(id);
      await fetchData();
    } catch (err) {
      setError("Errore durante l'eliminazione dello sconto.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProductName = (productId: string) => {
    // Prima prova a usare il nome salvato nello sconto
    const discount = discounts.find((d) => d.productId === productId);
    if (discount?.name) return discount.name;

    // Fallback: cerca nel packages
    const product = packages.find((p) => p.id === productId);
    return product?.nome || `Prodotto ID: ${productId}`;
  };

  const getProductPrice = (productId: string) => {
    const product = packages.find((p) => p.id === productId);
    return product?.prezzo || 0;
  };

  const calculateDiscountedPrice = (
    originalPrice: number,
    percentage: number
  ) => {
    return originalPrice * (1 - percentage / 100);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestione Sconti</h2>
          <p className="text-teal-200">
            Gestisci gli sconti sui prodotti del negozio
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Nuovo Sconto</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-300" />
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
          <span className="ml-3 text-teal-200">Caricamento...</span>
        </div>
      )}

      {/* Statistiche Sconti */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-400/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/30 p-2 rounded-lg">
              <Percent className="h-5 w-5 text-green-300" />
            </div>
            <div>
              <p className="text-green-300 text-sm font-medium">
                Sconti Attivi
              </p>
              <p className="text-white text-xl font-bold">
                {discounts.filter((d) => !isExpired(d.expiresAt)).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-500/30 p-2 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-300" />
            </div>
            <div>
              <p className="text-red-300 text-sm font-medium">Sconti Scaduti</p>
              <p className="text-white text-xl font-bold">
                {discounts.filter((d) => isExpired(d.expiresAt)).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500/30 p-2 rounded-lg">
              <PackageIcon className="h-5 w-5 text-orange-300" />
            </div>
            <div>
              <p className="text-orange-300 text-sm font-medium">
                Prodotti Scontati
              </p>
              <p className="text-white text-xl font-bold">
                {
                  new Set(
                    discounts
                      .filter((d) => !isExpired(d.expiresAt))
                      .map((d) => d.productId)
                  ).size
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Lista Sconti */}
      <div className="space-y-4">
        {discounts.length === 0 && !loading ? (
          <div className="text-center py-12 bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border border-teal-400/30">
            <Percent className="h-12 w-12 text-teal-300 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-teal-200 mb-2">
              Nessuno sconto attivo
            </h3>
            <p className="text-teal-300">
              Crea il primo sconto per iniziare a offrire promozioni ai tuoi
              clienti.
            </p>
          </div>
        ) : (
          discounts.map((discount) => {
            const productName = getProductName(discount.productId);
            const originalPrice = getProductPrice(discount.productId);
            const discountedPrice = calculateDiscountedPrice(
              originalPrice,
              discount.percentage
            );
            const expired = isExpired(discount.expiresAt);

            return (
              <div
                key={discount.id}
                className={`bg-gradient-to-r from-teal-800/50 to-emerald-800/50 backdrop-blur-sm rounded-xl border p-6 transition-all ${
                  expired
                    ? "border-red-400/30 opacity-75"
                    : "border-teal-400/30 hover:border-orange-400/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-xl shadow-lg ${
                        expired
                          ? "bg-gradient-to-r from-red-500 to-pink-500"
                          : "bg-gradient-to-r from-orange-500 to-amber-500"
                      }`}
                    >
                      <PackageIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {productName}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm mb-2">
                        <span className="flex items-center space-x-1 text-orange-300">
                          <Percent className="h-4 w-4" />
                          <span className="font-bold">
                            {discount.percentage}% di sconto
                          </span>
                        </span>
                        {discount.expiresAt ? (
                          <span
                            className={`flex items-center space-x-1 ${
                              expired ? "text-red-300" : "text-teal-300"
                            }`}
                          >
                            <Calendar className="h-4 w-4" />
                            <span>
                              {expired ? "Scaduto il" : "Scade il"}{" "}
                              {formatDate(discount.expiresAt)}
                            </span>
                          </span>
                        ) : (
                          <span className="text-green-300 font-medium flex items-center space-x-1">
                            <Infinity className="w-4 h-4" />
                            <span>permanente</span>
                          </span>
                        )}
                      </div>
                      {/* Anteprima prezzi - solo se il prodotto esiste */}
                      {originalPrice > 0 && (
                        <div className="flex items-center space-x-3">
                          <span className="text-teal-300 line-through text-sm">
                            €{originalPrice.toFixed(2)}
                          </span>
                          <span className="text-green-400 font-bold">
                            €{discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-teal-400">
                            (Risparmio: €
                            {(originalPrice - discountedPrice).toFixed(2)})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {expired && (
                      <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium border border-red-400/30">
                        Scaduto
                      </span>
                    )}
                    {!expired && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium border border-green-400/30">
                        Attivo
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteDiscount(discount.id)}
                      className="p-2 text-teal-300 hover:text-red-300 hover:bg-teal-700/50 rounded-lg transition-colors"
                      title="Elimina sconto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Nuovo Sconto */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-teal-800/95 to-emerald-800/95 backdrop-blur-xl rounded-2xl border border-teal-400/40 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-teal-400/30">
              <h2 className="text-xl font-bold text-white">Nuovo Sconto</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 rounded-xl text-teal-200 hover:text-white hover:bg-teal-700/50 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-teal-200 mb-2">
                  Prodotto da scontare *
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => {
                    const selectedId = e.target.value;

                    setFormData({ ...formData, productId: selectedId });
                  }}
                  className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  required
                >
                  <option value="">-- Seleziona un prodotto --</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.nome} (€{pkg.prezzo.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-200 mb-2">
                  Percentuale di sconto (%) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      percentage: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  placeholder="es. 20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-200 mb-2">
                  Data di fine sconto (opzionale)
                </label>
                <input
                  type="datetime-local"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    setFormData({ ...formData, expiresAt: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-teal-700/50 border border-teal-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                />
                <p className="text-xs text-teal-300 mt-1">
                  Se lasciato vuoto, lo sconto sarà permanente fino
                  all'eliminazione manuale
                </p>
              </div>

              {/* Anteprima sconto */}
              {formData.productId && formData.percentage > 0 && (
                <div className="bg-teal-700/30 rounded-xl p-4 border border-teal-400/30">
                  <h4 className="text-sm font-medium text-teal-200 mb-2">
                    Anteprima sconto:
                  </h4>
                  {(() => {
                    const product = packages.find(
                      (p) => p.id === formData.productId
                    );
                    if (!product) return null;
                    const discountedPrice =
                      product.prezzo * (1 - formData.percentage / 100);
                    return (
                      <div className="flex items-center space-x-3">
                        <span className="text-teal-300 line-through">
                          €{product.prezzo.toFixed(2)}
                        </span>
                        <span className="text-green-400 font-bold text-lg">
                          €{discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-teal-400">
                          (Risparmio: €
                          {(product.prezzo - discountedPrice).toFixed(2)})
                        </span>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-3 bg-teal-700/50 text-teal-200 rounded-xl hover:bg-teal-600/50 transition-all border border-teal-400/30"
                >
                  Annulla
                </button>
                <button
                  onClick={handleCreateDiscount}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? "Creazione..." : "Crea Sconto"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
