// src/lib/api.ts

import { createClient } from "@supabase/supabase-js";
import { NewsSection, News } from "../types";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

/* ---------- NEWS ---------- */
export const newsAPI = {
  getNews: async (): Promise<News[]> => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("order_index");
    if (error) throw error;
    return data.map((news) => ({
      id: news.id,
      title: news.title,
      content: news.content,
      orderIndex: news.order_index,
      createdBy: news.created_by,
      createdAt: news.created_at,
      updatedAt: news.updated_at,
    }));
  },
};

/* ---------- SECTIONS ---------- */
export const sectionsAPI = {
  getSections: async (): Promise<NewsSection[]> => {
    const { data: sections, error: sectionErr } = await supabase
      .from("news_sections")
      .select("*")
      .order("order_index");

    if (sectionErr) throw sectionErr;

    const NewsSections: NewsSection[] = await Promise.all(
      (sections || []).map(async (section) => {
        const { data: news, error: newsErr } = await supabase
          .from("news")
          .select("*")
          .eq("section_id", section.id)
          .order("order_index");

        if (newsErr) throw newsErr;

        return {
          id: section.id,
          title: section.title,
          description: section.description ?? "",
          icon: section.icon ?? "",
          orderIndex: section.order_index ?? 0,
          news: (news || []).map((rule) => ({
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

    return NewsSections;
  },
};

/* ---------- ADMIN ---------- */
export const adminAPI = {
  getStats: async (): Promise<{
    totalSections: number;
    totalnews: number;
  }> => {
    const { count: sectionCount, error: err1 } = await supabase
      .from("news_sections")
      .select("*", { count: "exact", head: true });
    if (err1) throw err1;

    const { count: newsCount, error: err2 } = await supabase
      .from("news")
      .select("*", { count: "exact", head: true });
    if (err2) throw err2;

    return {
      totalSections: sectionCount ?? 0,
      totalnews: newsCount ?? 0,
    };
  },
};

export const usersAPI = {
  getUserInfo: async (userId: string): Promise<Info> => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) throw error;
    return data;
  },
};

export default {
  newsAPI,
  sectionsAPI,
  adminAPI,
};
