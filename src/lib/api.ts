// src/lib/api.ts

import { createClient } from "@supabase/supabase-js";
import {
  RuleSection,
  Rule,
  Info,
  Package,
  StoreSection,
  Discount,
} from "./api/types";
import { v4 as uuidv4 } from "uuid";

/* ---------- RULES ---------- */
export const rulesAPI = {
  getRules: async (): Promise<Rule[]> => {
    const { data, error } = await supabase
      .from("rules")
      .select("*")
      .order("order_index");
    if (error) throw error;
    return data.map((rule) => ({
      id: rule.id,
      title: rule.title,
      content: rule.content,
      orderIndex: rule.order_index,
      createdBy: rule.created_by,
      createdAt: rule.created_at,
      updatedAt: rule.updated_at,
    }));
  },
};

/* ---------- SECTIONS ---------- */
export const sectionsAPI = {
  getSections: async (): Promise<RuleSection[]> => {
    const { data: sections, error: sectionErr } = await supabase
      .from("rule_sections")
      .select("*")
      .order("order_index");

    if (sectionErr) throw sectionErr;

    const sectionsWithRules: RuleSection[] = await Promise.all(
      (sections || []).map(async (section) => {
        const { data: rules, error: rulesErr } = await supabase
          .from("rules")
          .select("*")
          .eq("section_id", section.id)
          .order("order_index");

        if (rulesErr) throw rulesErr;

        return {
          id: section.id,
          title: section.title,
          description: section.description ?? "",
          icon: section.icon ?? "",
          orderIndex: section.order_index ?? 0,
          rules: (rules || []).map((rule) => ({
            id: rule.id,
            title: rule.title,
            content: rule.content,
            orderIndex: rule.order_index,
            createdBy: rule.created_by,
            createdAt: rule.created_at,
            updatedAt: rule.updated_at,
          })),
        };
      })
    );

    return sectionsWithRules;
  },
};

/* ---------- STORE ---------- */
export const StoreSectionsAPI = {
  getSections: async (): Promise<StoreSection[]> => {
    const { data, error } = await supabase
      .from("store_sections")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;
    return data || [];
  },
};

/* ---------- PACKAGES ---------- */
export const StorePackagesAPI = {
  getInfo: async (): Promise<Package[]> => {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("prezzo", { ascending: true });

    if (error) throw error;
    return data || [];
  },
};

/* ---------- DISCOUNTS ---------- */
export const DiscountAPI = {
  getActiveDiscounts: async (): Promise<Discount[]> => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("discounts")
      .select("*")
      .or(`expiresAt.is.null,expiresAt.gt.${now}`)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Trasforma i dati per compatibilità
    const transformedData = (data || []).map((discount) => ({
      ...discount,
      valore: discount.percentage,
      isActive:
        !discount.expiresAt || new Date(discount.expiresAt) > new Date(),
    }));

    return transformedData;
  },

  getAllDiscounts: async (): Promise<Discount[]> => {
    const { data, error } = await supabase
      .from("discounts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Trasforma i dati per compatibilità
    const transformedData = (data || []).map((discount) => ({
      ...discount,
      valore: discount.percentage,
      isActive:
        !discount.expiresAt || new Date(discount.expiresAt) > new Date(),
    }));

    return transformedData;
  },

  // Funzione per ottenere sconto per prodotto specifico
  getDiscountForProduct: async (
    productId: string
  ): Promise<Discount | null> => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("discounts")
      .select("*")
      .eq("productId", productId)
      .or(`expiresAt.is.null,expiresAt.gt.${now}`)
      .order("percentage", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    if (!data) return null;

    return {
      ...data,
      valore: data.percentage,
      isActive: !data.expiresAt || new Date(data.expiresAt) > new Date(),
    };
  },

  // Funzione per calcolare prezzo scontato
  calculateDiscountedPrice: (
    originalPrice: number,
    discount: Discount
  ): number => {
    const percentage = discount.percentage || discount.valore || 0;
    return originalPrice * (1 - percentage / 100);
  },
};

export default {
  rulesAPI,
  sectionsAPI,
  StorePackagesAPI,
  StoreSectionsAPI,
  DiscountAPI,
};
