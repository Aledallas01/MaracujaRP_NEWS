import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Crea un client Supabase oppure un mock se le env non sono configurate
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase environment variables not configured. Please set up Supabase connection."
    );
    // Mock client per evitare errori a runtime
    const mockQuery = {
      data: [],
      error: null,
      eq: () => mockQuery,
      order: () => mockQuery,
      single: () => ({
        data: null,
        error: { message: "Supabase not configured" },
      }),
    };

    return {
      from: () => ({
        select: () => mockQuery,
        insert: () => mockQuery,
        update: () => mockQuery,
        delete: () => mockQuery,
      }),
    } as any;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export const supabase = createSupabaseClient();

export interface Permissions {
  id: string;
  user_id: string;
  createSections: boolean;
  editSections: boolean;
  deleteSections: boolean;
  createNews: boolean;
  editNews: boolean;
  deleteNews: boolean;
  manageUsers: boolean;
}

export interface User {
  id: string;
  username: string;
  password: string;
  permissions: Permissions;
  created_at: string;
  updated_at: string;
  God: boolean;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  section_id: string;
  image: string;
  title: string;
  content: string;
  order_index: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  section?: Section;
}

export interface Rule {
  id: string;
  title: string;
  content: string;
  orderIndex: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  createdBy?: string;
}

export interface RuleSection {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  orderIndex: number;
  rules: Rule[];
}

export interface Package {
  id: string;
  nome: string;
  descrizione: string;
  immagine: string;
  prezzo: number;
  section_id?: string;
  created_at: string;
  updated_at: string;
}

export interface StoreSection {
  id: string;
  nome: string;
  descrizione?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Discount {
  id: string;
  productId: string;
  name: string;
  productName?: string;
  percentage: number;
  valore?: number;
  nome?: string;
  expiresAt?: string;
  created_at: string;
  isActive?: boolean;
}

export interface DiscountUsage {
  id: string;
  discount_id: string;
  user_identifier: string; // Email o ID utente
  data_utilizzo: string;
  valore_sconto_applicato: number;
  ordine_totale: number;
}
