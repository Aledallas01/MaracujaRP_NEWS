// src/components/PublicStoreView.tsx
import React, { useEffect, useState, useCallback } from "react";
import { ShoppingCart, MessageCircle, PackageOpen, Folder } from "lucide-react";
import { supabaseOther } from "../lib/other";
import type { Package, StoreSection } from "../lib/types";
import { Discount } from "../lib/types";
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
        supabaseOther
          .from("packages")
          .select("*")
          .order("prezzo", { ascending: true }),
        supabaseOther
          .from("store_sections")
          .select("*")
          .order("order_index", { ascending: true }),
        supabaseOther.from("discounts").select("*"),
      ]);

      if (pkgRes.error) setPackages([]);
      else
        setPackages(
          Array.isArray(pkgRes.data) ? (pkgRes.data as Package[]) : []
        );

      if (secRes.error) setSections([]);
      else
        setSections(
          Array.isArray(secRes.data) ? (secRes.data as StoreSection[]) : []
        );

      if (discRes.error) setActiveDiscounts([]);
      else {
        const discounts = Array.isArray(discRes.data)
          ? (discRes.data as Discount[])
          : [];
        console.log("Discounts da Supabase:", discounts); // 👀 debug
        const active = discounts.filter(
          (d) => !d.expiresAt || new Date(d.expiresAt) > new Date()
        );
        console.log("Discounts attivi:", active); // 👀 debug
        setActiveDiscounts(active);
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

  useEffect(() => {
    if (packages.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const pkgID = params.get("id");

    if (pkgID) {
      const found = packages.find((p) => String(p.id) === pkgID);
      if (found) setSelectedPackage(found);
    }
  }, [packages]);

  const getDiscountForProduct = useCallback(
    (productId: string) => {
      if (!productId) return null;
      const d = activeDiscounts.find(
        (disc) => disc && String(disc.product_id) === String(productId)
      );
      if (!d) return null;

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
      <div className="bg-gray-800 min-h-screen text-center py-16">
        <div className="animate-pulse">
          <ShoppingCart className="h-12 w-12 text-[#FE9900] mx-auto mb-4" />
          <p className="text-white text-lg">Caricamento in corso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 min-h-screen text-center py-16">
        <div className="bg-red-500/10 text-red-300 border border-red-500/30 rounded-xl p-6 inline-block">
          <p className="text-lg font-semibold mb-2">Errore</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10 mb-8 text-center">
          <button
            onClick={() => setShowDiscountModal(true)}
            title="Vedi gli sconti attivi"
            className="absolute top-4 right-4 inline-flex items-center justify-center bg-blue-500/20 text-blue-200 border border-blue-400/30 rounded-full p-2 hover:bg-blue-500/40 transition-all shadow-md"
          >
            <span className="font-bold text-lg leading-none">%</span>
          </button>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <ShoppingCart className="h-7 w-7 sm:h-8 sm:w-8 text-[#FE9900]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Store</h1>
          </div>
          <p className="text-white text-base sm:text-lg">
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
                    ? "bg-[#FE9900] text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600"
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
          <div className="text-center py-16 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-lg">
            <PackageOpen className="h-10 w-10 text-[#FE9900] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              {activeSection
                ? "Nessun prodotto in questa sezione"
                : "Nessun pacchetto disponibile"}
            </h3>
            <p className="text-white text-base mb-4">
              {activeSection
                ? "Prova a selezionare un'altra sezione o visualizza tutti i prodotti."
                : "Al momento non ci sono pacchetti acquistabili nello store."}
            </p>
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-[#FE9900]/20 border border-[#FE9900]/30 rounded-xl px-6 py-3 text-[#FE9900] font-medium hover:bg-[#FE9900]/40 transition-all"
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
                  className="cursor-pointer bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:bg-gray-700/80 transition-all duration-300"
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
                        <span className="absolute top-2 left-2 bg-gray-900/80 text-white text-xs font-semibold px-2 py-1 rounded-md border border-gray-700">
                          {section.nome}
                        </span>
                      )}
                      {discount && (
                        <span className="absolute top-2 right-2 bg-[#FE9900] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                          -{discount.percentage ?? discount.valore ?? 0}%
                        </span>
                      )}
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-2">
                    {pkg.nome}
                  </h3>
                  <p className="text-white text-sm mb-4 line-clamp-3">
                    Clicca per visualizzare i dettagli del prodotto.
                  </p>

                  <div className="mt-auto flex items-center justify-between mb-4">
                    {discount ? (
                      <div className="space-y-0.5">
                        <p className="text-sm text-[#FE9900] line-through">
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
                      <p className="text-xl font-bold text-[#FE9900]">
                        €{(pkg.prezzo ?? 0).toFixed(2)}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 italic text-right">
                      Non rimborsabile
                    </p>
                  </div>

                  <a
                    href={discordLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#FE9900]/20 hover:bg-[#FE9900]/40 text-[#FE9900] font-medium py-2 px-4 rounded-xl transition-all"
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
