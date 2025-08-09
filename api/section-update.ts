import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method !== "PUT")
    return res.status(405).json({ error: "Method not allowed" });

  const { id, title, description, icon, orderIndex } = req.body;

  const updateData: any = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (icon !== undefined) updateData.icon = icon;
  if (orderIndex !== undefined) updateData.order_index = orderIndex;

  const { data, error } = await supabase
    .from("news_sections")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json(data);
}
