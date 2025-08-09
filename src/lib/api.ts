// src/lib/api.ts

import { createClient } from "@supabase/supabase-js";
import {
  RuleSection,
  Rule,
  Info,
  Package,
  StoreSection,
  Discount,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

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

  createRule: async (rule: {
    sectionId: string;
    title: string;
    content: string;
    orderIndex?: number;
  }): Promise<Rule> => {
    const { data, error } = await supabase
      .from("rules")
      .insert({
        section_id: rule.sectionId,
        title: rule.title,
        content: rule.content,
        order_index: rule.orderIndex ?? 0,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      orderIndex: data.order_index,
      createdBy: data.created_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  updateRule: async (
    id: string,
    updates: {
      title?: string;
      content?: string;
      orderIndex?: number;
      sectionId?: string;
    }
  ): Promise<Rule> => {
    const updateData: any = { updated_at: new Date().toISOString() };
    if (updates.title) updateData.title = updates.title;
    if (updates.content) updateData.content = updates.content;
    if (updates.orderIndex !== undefined)
      updateData.order_index = updates.orderIndex;
    if (updates.sectionId) updateData.section_id = updates.sectionId;

    const { data, error } = await supabase
      .from("rules")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      orderIndex: data.order_index,
      createdBy: data.created_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  deleteRule: async (id: string): Promise<void> => {
    const { error } = await supabase.from("rules").delete().eq("id", id);
    if (error) throw error;
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

  createSection: async (
    title: string,
    description?: string,
    icon?: string,
    index?: number
  ): Promise<RuleSection> => {
    const newId = uuidv4();

    const { error } = await supabase.from("rule_sections").insert([
      {
        id: newId,
        title,
        description: description ?? "",
        icon: icon ?? "",
        order_index: index ?? 0,
      },
    ]);

    if (error) throw error;

    return {
      id: newId,
      title,
      description: description ?? "",
      icon: icon ?? "Palmtree",
      orderIndex: index ?? 0,
      rules: [],
    };
  },

  updateSection: async (
    id: string,
    updates: {
      title?: string;
      description?: string;
      icon?: string;
      orderIndex?: number;
    }
  ): Promise<RuleSection> => {
    const updateData: any = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined)
      updateData.description = updates.description;
    if (updates.icon !== undefined) updateData.icon = updates.icon;
    if (updates.orderIndex !== undefined)
      updateData.order_index = updates.orderIndex;

    if (Object.keys(updateData).length === 0) {
      throw new Error("Nessun campo da aggiornare");
    }

    const { data, error } = await supabase
      .from("rule_sections")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      icon: data.icon,
      orderIndex: data.order_index,
      rules: [],
    };
  },

  deleteSection: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("rule_sections")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  deleteAllSections: async () => {
    return fetch("/rule_sections", {
      method: "DELETE",
    });
  },
};

/* ---------- ADMIN ---------- */
export const adminAPI = {
  getStats: async (): Promise<{
    totalSections: number;
    totalRules: number;
  }> => {
    const { count: sectionCount, error: err1 } = await supabase
      .from("rule_sections")
      .select("*", { count: "exact", head: true });
    if (err1) throw err1;

    const { count: rulesCount, error: err2 } = await supabase
      .from("rules")
      .select("*", { count: "exact", head: true });
    if (err2) throw err2;

    return {
      totalSections: sectionCount ?? 0,
      totalRules: rulesCount ?? 0,
    };
  },
};

/* ---------- BACKUP ---------- */
export const backupAPI = {
  createBackup: async (
    name: string,
    type: "manual" | "auto",
    sections: RuleSection[]
  ) => {
    const backupId = uuidv4();

    const { error: metaError } = await supabase.from("backup_meta").insert([
      {
        id: backupId,
        name,
        type,
        status: "completed",
      },
    ]);
    if (metaError) throw metaError;

    const { error: dataError } = await supabase.from("backup_data").insert([
      {
        id: backupId,
        data: sections,
      },
    ]);
    if (dataError) throw dataError;

    return { id: backupId };
  },

  listBackups: async () => {
    const { data, error } = await supabase
      .from("backup_meta")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { meta: data };
  },

  fetchBackupData: async (id: string): Promise<RuleSection[]> => {
    const { data, error } = await supabase
      .from("backup_data")
      .select("data")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data.data;
  },
};

/* ---------- INFO ---------- */
export const InfoAPI = {
  getInfo: async (): Promise<Info[]> => {
    const { data, error } = await supabase.from("info").select("*");
    if (error) throw error;
    return data as Info[];
  },

  createInfo: async (
    name: string,
    title: string,
    motd: string,
    footer_message: string,
    use_url: boolean,
    store_url: string,
    store_available: boolean,
    unavailablestoremessage: string
  ): Promise<Info> => {
    const newId = uuidv4();

    const { error } = await supabase.from("info").insert([
      {
        id: newId,
        title,
        name: name ?? "MaracujaRP",
        motd: motd ?? "Regolamento del Server",
        footer_message:
          footer_message ??
          "Una comunità roleplay dedicata al divertimento e al rispetto reciproco. Unisciti a noi per vivere avventure indimenticabili! 🌴",
        use_url: use_url ?? false,
        store_url: store_url ?? "",
        store_available: store_available,
        unavailablestoremessage:
          unavailablestoremessage ?? "Lo Store non è al momento disponibile!",
      },
    ]);

    if (error) throw error;

    return {
      id: newId,
      title,
      name: name ?? "MaracujaRP",
      motd: motd ?? "Regolamento del Server",
      footer_message:
        footer_message ??
        "Una comunità roleplay dedicata al divertimento e al rispetto reciproco. Unisciti a noi per vivere avventure indimenticabili! 🌴",
      use_url: use_url ?? false,
      store_url: store_url ?? "",
      store_available: store_available,
      unavailablestoremessage:
        unavailablestoremessage ?? "Lo Store non è al momento disponibile!",
    };
  },

  updateInfo: async (
    id: string,
    updates: {
      name?: string;
      title?: string;
      motd?: string;
      footer_message?: string;
      use_url?: boolean;
      store_url?: string;
      store_available?: boolean;
      unavailablestoremessage?: string;
    }
  ): Promise<Info> => {
    const updateData: Partial<Info> = {};
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.motd !== undefined) updateData.motd = updates.motd;
    if (updates.footer_message !== undefined)
      updateData.footer_message = updates.footer_message;
    if (updates.use_url !== undefined) updateData.use_url = updates.use_url;
    if (updates.store_url !== undefined)
      updateData.store_url = updates.store_url;
    if (updates.store_available !== undefined)
      updateData.store_available = updates.store_available;
    if (updates.unavailablestoremessage !== undefined)
      updateData.unavailablestoremessage = updates.unavailablestoremessage;

    if (Object.keys(updateData).length === 0) {
      throw new Error("Nessun campo da aggiornare");
    }

    const { data, error } = await supabase
      .from("info")
      .update(updateData)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      throw new Error("Nessun record aggiornato.");
    }

    return {
      id: data.id,
      name: data.name,
      title: data.title,
      motd: data.motd,
      footer_message: data.footer_message,
      use_url: data.use_url,
      store_url: data.store_url,
      store_available: data.store_available,
      unavailablestoremessage: data.unavailablestoremessage,
    };
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

  createSection: async (sectionData: {
    nome: string;
    descrizione?: string;
    order_index: number;
  }): Promise<StoreSection> => {
    const { data, error } = await supabase
      .from("store_sections")
      .insert([sectionData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateSection: async (
    id: string,
    updates: {
      nome?: string;
      descrizione?: string;
      order_index?: number;
    }
  ): Promise<StoreSection> => {
    const updateData: any = { updated_at: new Date().toISOString() };
    if (updates.nome !== undefined) updateData.nome = updates.nome;
    if (updates.descrizione !== undefined)
      updateData.descrizione = updates.descrizione;
    if (updates.order_index !== undefined)
      updateData.order_index = updates.order_index;

    const { data, error } = await supabase
      .from("store_sections")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteSection: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("store_sections")
      .delete()
      .eq("id", id);
    if (error) throw error;
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

  createPackage: async (packageData: {
    nome: string;
    descrizione: string;
    immagine: string;
    prezzo: number;
    section_id?: string;
  }): Promise<Package> => {
    const { data, error } = await supabase
      .from("packages")
      .insert([packageData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updatePackage: async (
    id: string,
    updates: {
      nome?: string;
      descrizione?: string;
      immagine?: string;
      prezzo?: number;
      section_id?: string;
    }
  ): Promise<Package> => {
    const updateData: any = { updated_at: new Date().toISOString() };
    if (updates.nome !== undefined) updateData.nome = updates.nome;
    if (updates.descrizione !== undefined)
      updateData.descrizione = updates.descrizione;
    if (updates.immagine !== undefined) updateData.immagine = updates.immagine;
    if (updates.prezzo !== undefined) updateData.prezzo = updates.prezzo;
    if (updates.section_id !== undefined)
      updateData.section_id = updates.section_id;

    const { data, error } = await supabase
      .from("packages")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  deletePackage: async (id: string): Promise<void> => {
    const { error } = await supabase.from("packages").delete().eq("id", id);

    if (error) throw error;
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

  createDiscount: async (discountData: {
    productId: string;
    percentage: number;
    expiresAt?: string;
  }): Promise<Discount> => {
    // Recupera il nome del prodotto dalla tabella packages
    const { data: product, error: productError } = await supabase
      .from("packages")
      .select("nome")
      .eq("id", discountData.productId)
      .single();

    if (productError) {
      throw new Error(`Prodotto non trovato: ${productError.message}`);
    }

    if (!product) {
      throw new Error("Prodotto non trovato");
    }

    const { data, error } = await supabase
      .from("discounts")
      .insert([
        {
          productId: discountData.productId,
          name: product.nome,
          percentage: discountData.percentage,
          expiresAt: discountData.expiresAt || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      valore: data.percentage,
      isActive: !data.expiresAt || new Date(data.expiresAt) > new Date(),
    };
  },

  deleteDiscount: async (id: string): Promise<void> => {
    const { error } = await supabase.from("discounts").delete().eq("id", id);

    if (error) throw error;
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
  adminAPI,
  backupAPI,
  InfoAPI,
  StorePackagesAPI,
  StoreSectionsAPI,
  DiscountAPI,
};
