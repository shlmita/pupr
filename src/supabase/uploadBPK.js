import { createClient } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

export default async function uploadBPK(formData) {
  const { data, error } = await supabase
    .from("kegiatan")
    .insert([formData]);

  if (error) {
    console.error("Error uploading data:", error);
    return false;
  }

  return true;
}
