import React, { useEffect, useState, useCallback } from "react";
import { ShoppingCart, MessageCircle, PackageOpen, Folder, Tag, Star } from "lucide-react";
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
        const active = discounts.filter(
          (d) => !d.expiresAt || new Date(d.expiresAt) > new Date()
        );
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
        (disc) => disc && String(disc.productId) === String(productId)
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
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Caricamento store...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageOpen className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Errore</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-12"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-white"
            ></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="h-7 w-7 text-white" />
                </div>
                <h1 className="text-4xl font-bold">Store MaracujaRP</h1>
              </div>
              <p className="text-orange-100 text-lg max-w-2xl">
                Scopri i nostri pacchetti esclusivi e migliora la tua esperienza di gioco
              </p>
            </div>
            
            {activeDiscounts.length > 0 && (
              <button
                onClick={() => setShowDiscountModal(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-3 transition-all duration-200 flex items-center space-x-2"
              >
                <Tag className="h-5 w-5" />
                <span className="font-semibold">Sconti Attivi</span>
                <span className="bg-white text-orange-600 text-sm font-bold px-2 py-1 rounded-full">
                  {activeDiscounts.length}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative -mt-6">
        {/* Filtri Sezioni */}
        {sections.length > 0 && (
          <div className="mb-8 relative z-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Categorie</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveSection(null)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  !activeSection
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Star className="h-4 w-4" />
                <span>Tutti i prodotti</span>
              </button>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() =>
                    setActiveSection((prev) =>
                      prev === String(section.id) ? null : String(section.id)
                    )
                  }
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    String(activeSection) === String(section.id)
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Folder className="h-4 w-4" />
                  <span>{section.nome}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Prodotti */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PackageOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {activeSection
                ? "Nessun prodotto in questa categoria"
                : "Store temporaneamente vuoto"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {activeSection
                ? "Prova a selezionare un'altra categoria o visualizza tutti i prodotti."
                : "Al momento non ci sono pacchetti disponibili. Torna presto per nuovi prodotti!"}
            </p>
            <a
              href={discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Contattaci su Discord</span>
            </a>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  className="group cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Immagine */}
                  <div className="relative h-48 bg-gray-50">
                    <img
                      src={pkg.immagine || "/logo.png"}
                      alt={pkg.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/logo.png";
                      }}
                    />
                    
                    {/* Badge sezione */}
                    {section && (
                      <div className="absolute top-3 left-3 bg-gray-800/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                        {section.nome}
                      </div>
                    )}
                    
                    {/* Badge sconto */}
                    {discount && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        -{discount.percentage ?? discount.valore ?? 0}%
                      </div>
                    )}
                  </div>

                  {/* Contenuto */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                      {pkg.nome}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      Scopri tutti i vantaggi e le funzionalità incluse in questo pacchetto.
                    </p>

                    {/* Prezzo */}
                    <div className="mb-4">
                      {discount ? (
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg text-gray-400 line-through">
                              €{(pkg.prezzo ?? 0).toFixed(2)}
                            </span>
                            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
                              SCONTO
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-orange-600">
                            €{(discountedPrice ?? 0).toFixed(2)}
                          </p>
                          <p className="text-sm text-green-600 font-medium">
                            Risparmi €{((pkg.prezzo ?? 0) - (discountedPrice ?? 0)).toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-2xl font-bold text-gray-800">
                          €{(pkg.prezzo ?? 0).toFixed(2)}
                        </p>
                      )}
                    </div>

                    {/* Nota non rimborsabile */}
                    <p className="text-xs text-gray-500 italic mb-4">
                      Acquisto non rimborsabile
                    </p>

                    {/* Pulsante supporto */}
                    <a
                      href={discordLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-orange-500 text-gray-700 hover:text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 group/btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Supporto Discord</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal dettagli prodotto */}
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

      {/* Modal sconti attivi */}
      {showDiscountModal && (
        <ActiveDiscountModal onClose={() => setShowDiscountModal(false)} />
      )}
    </div>
  );
};

export default PublicStoreView;