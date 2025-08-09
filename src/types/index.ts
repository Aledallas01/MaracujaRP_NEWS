// src/types/index.ts

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

export interface AdminUser {
  id: string;
  username: string;
  role: "admin" | "super_admin" | "moderator";
  lastLogin: Date;
}

export interface RuleFormData {
  title: string;
  content: string;
  sectionId: string;
}

export interface Info {
  id: string;
  name: string;
  title: string;
  motd: string;
  footer_message: string;
  use_url: boolean;
  store_url: string;
  store_available: boolean;
  unavailablestoremessage: string;
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
  valore?: number; // Alias per percentage per compatibilità legacy
  nome?: string; // Alias per productName per compatibilità legacy
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
