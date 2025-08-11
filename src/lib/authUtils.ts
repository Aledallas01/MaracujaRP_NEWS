import { supabase, Permissions } from "./supabase";

export const defaultPermissions: Permissions = {
  createSections: false,
  editSections: false,
  deleteSections: false,
  createNews: false,
  editNews: false,
  deleteNews: false,
  manageUsers: false,
};

export async function createProfile(
  userId: string,
  username: string,
  permissions = defaultPermissions
) {
  const { data, error } = await supabase.from("profiles").insert([
    {
      id: userId,
      username,
      permissions,
    },
  ]);

  if (error) {
    console.error("Errore creazione profilo:", error);
    return null;
  }
  return data;
}
