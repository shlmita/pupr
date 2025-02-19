import { supabase } from "./supabaseClient";

export const uploadMedia = async (file, folder = "default") => {
  try {
    console.log("Mengunggah file:", file.name);

    // Gunakan nama unik untuk menghindari overwrite
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("media-uploads")
      .upload(`${folder}/${fileName}`, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    console.log("File berhasil diunggah:", data);
    return `${folder}/${fileName}`; // ✅ Kembalikan path yang benar
  } catch (error) {
    console.error("Error saat upload media:", error);
    throw error;
  }
};

export const getMediaUrl = (path) => {
  const { data } = supabase.storage.from("media-uploads").getPublicUrl(path);
  console.log("Public URL:", data.publicUrl); // ✅ Debugging
  return data.publicUrl;
};

