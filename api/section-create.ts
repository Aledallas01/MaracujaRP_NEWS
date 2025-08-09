import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { title, description, icon, orderIndex } = req.body;
  const newId = uuidv4();

  const { error } = await supabase.from("news_sections").insert([
    {
      id: newId,
      title,
      description: description ?? "",
      icon: icon ?? "",
      order_index: orderIndex ?? 0,
    },
  ]);

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ id: newId });
}
