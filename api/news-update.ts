import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method !== "PUT")
    return res.status(405).json({ error: "Method not allowed" });

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

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json(data);
}
