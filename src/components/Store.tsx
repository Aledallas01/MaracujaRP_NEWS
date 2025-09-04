// src/components/Store.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  ShoppingCart,
  MessageCircle,
  PackageOpen,
  ArrowLeft,
} from "lucide-react";
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

      setPackages(Array.isArray(pkgRes.data) ? (pkgRes.data as Package[]) : []);
      setSections(
        Array.isArray(secRes.data) ? (secRes.data as StoreSection[]) : []
      );

      const discounts = Array.isArray(discRes.data)
        ? (discRes.data as Discount[])
        : [];
      setActiveDiscounts(
        discounts.filter(
          (d) => !d.expiresAt || new Date(d.expiresAt) > new Date()
        )
      );
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
    : [];

  if (loading) {
    return (
      <div
        style={{
          background: "#1F2937",
          minHeight: "100vh",
          textAlign: "center",
          padding: "4rem 0",
        }}
      >
        <div style={{ animation: "pulse 1.5s infinite" }}>
          <ShoppingCart
            style={{
              height: "3rem",
              width: "3rem",
              color: "#FE9900",
              margin: "0 auto 1rem",
            }}
          />
          <p style={{ color: "white", fontSize: "1.125rem" }}>
            Caricamento in corso...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: "#1F2937",
          minHeight: "100vh",
          textAlign: "center",
          padding: "4rem 1rem",
        }}
      >
        <div
          style={{
            background: "rgba(248, 113, 113, 0.1)",
            color: "#FCA5A5",
            border: "1px solid rgba(248, 113, 113, 0.3)",
            borderRadius: "1rem",
            padding: "1.5rem",
            display: "inline-block",
          }}
        >
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            Errore
          </p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#3C3C3C", minHeight: "100vh" }}>
      {/* HERO */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "60vh",
          backgroundImage:
            "linear-gradient(to right, rgba(249,115,22,0.9), rgba(251,146,60,0.9)), url('/store-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <button
            onClick={() => setShowDiscountModal(true)}
            title="Vedi gli sconti attivi"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(59, 130, 246, 0.2)",
              color: "#BFDBFE",
              border: "1px solid rgba(147,197,253,0.3)",
              borderRadius: "9999px",
              padding: "0.5rem",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.125rem",
                lineHeight: 1,
              }}
            >
              %
            </span>
          </button>

          <div style={{ position: "relative", zIndex: 30 }}>
            <img
              src="/trasparent-logo.png"
              alt="Logo Store"
              style={{
                display: "block",
                filter: "drop-shadow(rgba(0, 0, 0, 0.15) 0px 25px 25px)",
                height: "248px",
                objectFit: "contain",
                position: "absolute",
                top: "11px",
                width: "291px",
              }}
            />
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 20,
              background: "rgba(107, 114, 128, 0.9)",
              backdropFilter: "blur(10px)",
              borderRadius: "1.5rem",
              border: "1px solid rgba(107, 114, 128,0.5)",
              textAlign: "center",
              padding: "1.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "200px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <ShoppingCart
                style={{ height: "1.5rem", width: "1.5rem", color: "#FE9900" }}
              />
              <h1
                style={{ fontSize: "2rem", fontWeight: "700", color: "white" }}
              >
                Store
              </h1>
            </div>
            <p
              style={{
                color: "white",
                fontSize: "1rem",
                maxWidth: "48rem",
                lineHeight: 1.6,
              }}
            >
              Esplora i pacchetti disponibili e personalizza la tua esperienza
              nel server!
            </p>
          </div>
        </div>
      </div>

      {/* SECTIONS / PACKAGES */}
      <div style={{ padding: "1.5rem 1rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {!activeSection ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              {sections.map((section) => (
                <div
                  key={section.id}
                  onClick={() => setActiveSection(String(section.id))}
                  style={{
                    cursor: "pointer",
                    background: "rgba(31, 41, 55, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid #374151",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "200px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.border = "3px solid #FE9900";
                    el.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.border = "2px solid #374151";
                    el.style.transform = "scale(1)";
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: "1.125rem",
                      color: "white",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                      textAlign: "center",
                    }}
                  >
                    {section.nome}
                  </h3>
                  {section.descrizione && (
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#D1D5DB",
                        textAlign: "center",
                        lineHeight: 1.5,
                      }}
                    >
                      {section.descrizione}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => setActiveSection(null)}
                style={{
                  marginBottom: "1.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: "#374151",
                  color: "white",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#4B5563";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#374151";
                }}
              >
                <ArrowLeft style={{ height: "1rem", width: "1rem" }} /> Torna
                alle sezioni
              </button>

              {filteredPackages.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "4rem",
                    background: "rgba(31,41,55,0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid #374151",
                    borderRadius: "1.5rem",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <PackageOpen
                    style={{
                      height: "2.5rem",
                      width: "2.5rem",
                      color: "#FE9900",
                      margin: "0 auto 1rem",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "white",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Nessun prodotto
                  </h3>
                  <p style={{ color: "white", fontSize: "1rem" }}>
                    Al momento non ci sono pacchetti in questa sezione.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {filteredPackages.map((pkg) => {
                    const discount = getDiscountForProduct(pkg.id);
                    const discountedPrice = discount
                      ? calculateDiscountedPrice(pkg.prezzo, discount)
                      : pkg.prezzo;

                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        style={{
                          cursor: "pointer",
                          background: "rgba(31, 41, 55, 0.8)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid #374151",
                          borderRadius: "1rem",
                          padding: "1.5rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.border = "2px solid #FE9900";
                          el.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.border = "1px solid #374151";
                          el.style.transform = "scale(1)";
                        }}
                      >
                        {pkg.immagine && (
                          <div
                            style={{
                              position: "relative",
                              marginBottom: "1rem",
                            }}
                          >
                            <img
                              src={pkg.immagine || "/logo.png"}
                              alt={pkg.nome}
                              style={{
                                width: "100%",
                                height: "12rem",
                                objectFit: "cover",
                                borderRadius: "0.75rem",
                              }}
                              onError={(e) => {
                                e.currentTarget.src = "/logo.png";
                              }}
                            />
                            {discount && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: "0.5rem",
                                  right: "0.5rem",
                                  background: "#FE9900",
                                  color: "white",
                                  fontSize: "0.75rem",
                                  fontWeight: "700",
                                  padding: "0.25rem 0.5rem",
                                  borderRadius: "0.5rem",
                                }}
                              >
                                -{discount.percentage ?? discount.valore ?? 0}%
                              </span>
                            )}
                          </div>
                        )}

                        <h3
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "700",
                            color: "white",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {pkg.nome}
                        </h3>
                        <p
                          style={{
                            color: "white",
                            fontSize: "0.875rem",
                            marginBottom: "1rem",
                          }}
                        >
                          Clicca per visualizzare i dettagli del prodotto.
                        </p>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1rem",
                          }}
                        >
                          {discount ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#FE9900",
                                  textDecoration: "line-through",
                                }}
                              >
                                €{(pkg.prezzo ?? 0).toFixed(2)}
                              </span>
                              <span
                                style={{
                                  fontSize: "1.25rem",
                                  fontWeight: "700",
                                  color: "#22C55E",
                                }}
                              >
                                €{(discountedPrice ?? 0).toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span
                              style={{
                                fontSize: "1.25rem",
                                fontWeight: "700",
                                color: "#FE9900",
                              }}
                            >
                              €{(pkg.prezzo ?? 0).toFixed(2)}
                            </span>
                          )}
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "#9CA3AF",
                              fontStyle: "italic",
                              textAlign: "right",
                            }}
                          >
                            Non rimborsabile
                          </span>
                        </div>

                        <a
                          href={discordLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            background: "rgba(254,153,0,0.2)",
                            color: "#FE9900",
                            fontWeight: "500",
                            padding: "0.5rem",
                            borderRadius: "1rem",
                            textDecoration: "none",
                            transition: "all 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLAnchorElement
                            ).style.background = "rgba(254,153,0,0.4)";
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLAnchorElement
                            ).style.background = "rgba(254,153,0,0.2)";
                          }}
                        >
                          <MessageCircle
                            style={{ width: "1.25rem", height: "1.25rem" }}
                          />
                          Supporto Discord
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
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
