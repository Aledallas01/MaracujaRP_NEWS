import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

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

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json(data);
}
