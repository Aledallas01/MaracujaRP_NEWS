import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Create a placeholder client if environment variables are not set
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase environment variables not configured. Please set up Supabase connection."
    );
    // Return a mock client that won't cause errors
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
  permissions: Permissions; // <-- Aggiunto qui
  created_at: string;
  updated_at: string;
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
