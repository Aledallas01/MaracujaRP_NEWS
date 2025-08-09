import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method !== "PUT")
    return res.status(405).json({ error: "Method not allowed" });

  const { id, username, password } = req.body;
  const updateData: any = {};
  if (username) updateData.username = username;
  if (password) updateData.password = password;

  const { error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ success: true });
}
