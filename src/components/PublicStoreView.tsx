// src/components/PublicStoreView.tsx
import React, { useEffect, useState, useCallback } from "react";
import { ShoppingCart, MessageCircle, PackageOpen, Folder } from "lucide-react";
import { supabaseOther } from "../lib/other";
import type { Package, StoreSection, Discount } from "../lib/types";
import ProductDetailsModal from "../components/ProductDetailsModal";
import ActiveDiscountModal from "../components/ActiveDiscountModal";

const discordLink =
  "https://discord.com/channels/1258732999214632982/1333937942141337721";

const PublicStoreView: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [sections, setSections] = useState<StoreSection[]>([]);
  const [activeDiscounts, setActiveDiscounts] = useState<Discount[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDiscountModal, setShowDiscountModal] = useState<boolean>(false);

  const loadStoreData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [pkgRes, secRes, discRes] = await Promise.all([
        // ATTENZIONE: su "packages" NON usiamo order_index, perché non esiste nel tuo tipo.
        supabaseOther
          .from("packages")
          .select("*")
          .order("created_at", { ascending: true }),
        supabaseOther
          .from("store_sections")
          .select("*")
          .order("order_index", { ascending: true }),
        supabaseOther.from("discounts").select("*").eq("isActive", true),
      ]);

      if (pkgRes.error) {
        console.error("[Supabase] packages error:", pkgRes.error);
        setPackages([]);
      } else {
        setPackages(
          Array.isArray(pkgRes.data) ? (pkgRes.data as Package[]) : []
        );
      }

      if (secRes.error) {
        console.error("[Supabase] store_sections error:", secRes.error);
        setSections([]);
      } else {
        setSections(
          Array.isArray(secRes.data) ? (secRes.data as StoreSection[]) : []
        );
      }

      if (discRes.error) {
        console.error("[Supabase] discounts error:", discRes.error);
        setActiveDiscounts([]);
      } else {
        setActiveDiscounts(
          Array.isArray(discRes.data) ? (discRes.data as Discount[]) : []
        );
      }
    } catch (err) {
      console.error("Errore caricamento dati store:", err);
      setError("Errore caricamento dati store. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStoreData();
  }, [loadStoreData]);

  const getDiscountForProduct = useCallback(
    (productId: string) => {
      if (!productId) return null;
      const d = activeDiscounts.find(
        (disc) => disc && String(disc.productId) === String(productId)
      );
      if (!d) return null;

      // Se c'è una data di scadenza e risulta nel passato, ignora
      if (d.expiresAt) {
        const exp = new Date(d.expiresAt);
        if (!isNaN(exp.getTime()) && exp < new Date()) return null;
      }
      return d;
    },
    [activeDiscounts]
  );

  const calculateDiscountedPrice = useCallback(
    (originalPrice: number, discount: Discount) => {
      const percentage =
        (typeof discount.percentage === "number"
          ? discount.percentage
          : undefined) ??
        (typeof discount.valore === "number" ? discount.valore : undefined) ??
        0;

      const safePrice = typeof originalPrice === "number" ? originalPrice : 0;
      return safePrice * (1 - percentage / 100);
    },
    []
  );

  const filteredPackages = activeSection
    ? packages.filter((pkg) => String(pkg.section_id) === String(activeSection))
    : packages;

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-pulse">
          <ShoppingCart className="h-12 w-12 text-teal-300 mx-auto mb-4" />
          <p className="text-teal-200 text-lg">Caricamento in corso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-500/10 text-red-200 border border-red-400/30 rounded-xl p-6">
          <p className="text-lg font-semibold mb-2">Errore</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-teal-800/30 to-emerald-800/30 backdrop-blur-sm border border-teal-400/30 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8 text-center">
          <button
            onClick={() => setShowDiscountModal(true)}
            title="Vedi gli sconti attivi"
            className="absolute top-4 right-4 inline-flex items-center justify-center bg-orange-500/20 text-orange-200 border border-orange-400/30 rounded-full p-2 hover:bg-orange-500/40 hover:text-white transition-all shadow-lg"
          >
            <span className="font-bold text-lg leading-none">%</span>
          </button>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <ShoppingCart className="h-7 w-7 sm:h-8 sm:w-8 text-orange-300" />
            <h1 className="text-3xl sm:text-4xl font-bold text-orange-200">
              Store
            </h1>
          </div>
          <p className="text-teal-200 text-base sm:text-lg">
            Esplora i pacchetti disponibili e personalizza la tua esperienza nel
            server!
          </p>
        </div>

        {/* Sezioni */}
        {sections.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() =>
                  setActiveSection((prev) =>
                    prev === String(section.id) ? null : String(section.id)
                  )
                }
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                  String(activeSection) === String(section.id)
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                    : "bg-teal-700/30 text-teal-200 hover:text-white hover:bg-teal-600/40 border border-teal-400/30"
                }`}
              >
                <Folder className="h-4 w-4" />
                <span>{section.nome}</span>
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-teal-800/30 to-emerald-800/30 backdrop-blur-sm border border-teal-400/30 rounded-3xl shadow-xl">
            <PackageOpen className="h-10 w-10 text-orange-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-orange-200 mb-3">
              {activeSection
                ? "Nessun prodotto in questa sezione"
                : "Nessun pacchetto disponibile"}
            </h3>
            <p className="text-teal-200 text-base mb-4">
              {activeSection
                ? "Prova a selezionare un'altra sezione o visualizza tutti i prodotti."
                : "Al momento non ci sono pacchetti acquistabili nello store."}
            </p>
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-sm border border-indigo-400/50 rounded-xl px-6 py-3 text-indigo-200 font-medium hover:from-indigo-500/40 hover:to-purple-500/40 transition-all"
            >
              💬 Contattaci su Discord
            </a>
          </div>
        ) : (
          /* Cards prodotti */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => {
              const section = sections.find(
                (s) => String(s.id) === String(pkg.section_id)
              );
              const discount = getDiscountForProduct(pkg.id);
              const discountedPrice = discount
                ? calculateDiscountedPrice(pkg.prezzo, discount)
                : pkg.prezzo;

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className="cursor-pointer bg-gradient-to-br from-emerald-700/40 to-teal-700/40 backdrop-blur-sm border border-teal-400/30 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {pkg.immagine && (
                    <div className="relative mb-4">
                      <img
                        src={pkg.immagine || "/logo.png"}
                        alt={pkg.nome}
                        className="object-cover w-full h-48 rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/logo.png";
                        }}
                      />
                      {section && (
                        <span className="absolute top-2 left-2 bg-teal-700/80 text-teal-100 text-xs font-semibold px-2 py-1 rounded-md shadow-md backdrop-blur-sm border border-teal-400/30">
                          {section.nome}
                        </span>
                      )}
                      {discount && (
                        <span className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          -{discount.percentage ?? discount.valore ?? 0}%
                        </span>
                      )}
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-orange-200 mb-2">
                    {pkg.nome}
                  </h3>
                  <p className="text-teal-200 text-sm mb-4 line-clamp-3">
                    Clicca per visualizzare i dettagli del prodotto.
                  </p>

                  <div className="mt-auto flex items-center justify-between mb-4">
                    {discount ? (
                      <div className="space-y-0.5">
                        <p className="text-sm text-teal-300 line-through">
                          €{(pkg.prezzo ?? 0).toFixed(2)}
                        </p>
                        <p className="text-xl font-bold text-green-400">
                          €{(discountedPrice ?? 0).toFixed(2)}
                        </p>
                        <p className="text-xs text-green-300">
                          Risparmi €
                          {((pkg.prezzo ?? 0) - (discountedPrice ?? 0)).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xl font-bold text-orange-300">
                        €{(pkg.prezzo ?? 0).toFixed(2)}
                      </p>
                    )}
                    <p className="text-xs text-red-300 italic text-right">
                      Non rimborsabile
                    </p>
                  </div>

                  <a
                    href={discordLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-orange-500/30 hover:bg-orange-500/50 backdrop-blur-sm text-orange-200 hover:text-white font-medium py-2 px-4 rounded-xl transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Supporto Discord
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedPackage && (
        <ProductDetailsModal
          product={{
            id: selectedPackage.id,
            name: selectedPackage.nome,
            description: selectedPackage.descrizione,
            price: selectedPackage.prezzo,
            image: selectedPackage.immagine,
          }}
          discount={getDiscountForProduct(selectedPackage.id)}
          onClose={() => setSelectedPackage(null)}
        />
      )}

      {showDiscountModal && (
        <ActiveDiscountModal onClose={() => setShowDiscountModal(false)} />
      )}
    </div>
  );
};

export default PublicStoreView;
