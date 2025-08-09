// src/types/index.ts

export interface News {
  id: string;
  title: string;
  content: string;
  orderIndex: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  createdBy?: string;
}

export interface NewsSection {
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
