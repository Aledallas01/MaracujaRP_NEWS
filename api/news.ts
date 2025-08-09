import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { sectionId, title, content, orderIndex } = req.body;
      const { data, error } = await supabase
        .from("news")
        .insert({
          section_id: sectionId,
          title,
          content,
          order_index: orderIndex ?? 0,
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "PUT") {
      const { id, title, content, orderIndex, sectionId } = req.body;
      const updateData: any = { updated_at: new Date().toISOString() };
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      if (orderIndex !== undefined) updateData.order_index = orderIndex;
      if (sectionId) updateData.section_id = sectionId;

      const { data, error } = await supabase
        .from("news")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      const { error } = await supabase.from("news").delete().eq("id", id);

      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
