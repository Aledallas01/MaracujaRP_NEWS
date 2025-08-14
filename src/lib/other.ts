import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_OTHER_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_OTHER_SUPABASE_ANON_KEY || "";

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
