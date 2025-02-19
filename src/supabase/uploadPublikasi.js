import { supabase } from "../supabase/supabaseClient";

// **Fungsi untuk Mengunggah Publikasi**
export const uploadPublikasi = async (title, thumbnailFile, mediaFile) => {
  if (!mediaFile || !mediaFile.type.includes("pdf")) {
    throw new Error("Media harus berupa file PDF!");
  }
  if (!thumbnailFile) {
    throw new Error("Thumbnail tidak boleh kosong!");
  }

  // Path unik untuk menyimpan file
  const imgPath = `thumbnails/${Date.now()}_${thumbnailFile.name}`;
  const pdfPath = `pdfs/${Date.now()}_${mediaFile.name}`;

  // Upload Thumbnail
  const { data: imgData, error: imgError } = await supabase.storage
    .from("publikasi-uploads")
    .upload(imgPath, thumbnailFile);

  if (imgError) throw new Error("Gagal mengunggah thumbnail!");

  // Upload PDF
  const { data: pdfData, error: pdfError } = await supabase.storage
    .from("publikasi-uploads")
    .upload(pdfPath, mediaFile);

  if (pdfError) throw new Error("Gagal mengunggah PDF!");

  // Simpan data ke database
  const { error: dbError } = await supabase.from("publikasi").insert([
    {
      title,
      thumbnail: imgData.path,
      media: pdfData.path,
      updated_at: new Date(),
    },
  ]);

  if (dbError) throw new Error("Gagal menyimpan data ke database!");

  return "Berhasil mengunggah publikasi!";
};

// **Fungsi untuk Mengambil Publikasi**
export const fetchPublikasi = async () => {
  const { data, error } = await supabase.from("publikasi").select("*");

  if (error) throw new Error("Gagal mengambil data publikasi!");

  return data.map((item) => ({
    ...item,
    thumbnailUrl: supabase.storage.from("publikasi-uploads").getPublicUrl(item.thumbnail).publicUrl,
    mediaUrl: supabase.storage.from("publikasi-uploads").getPublicUrl(item.media).publicUrl,
  }));
};

// **Fungsi untuk Menghapus Publikasi**
export const deletePublikasi = async (id, thumbnailPath, mediaPath) => {
  // Hapus file di storage
  await supabase.storage.from("publikasi-uploads").remove([thumbnailPath, mediaPath]);

  // Hapus dari database
  const { error } = await supabase.from("publikasi").delete().eq("id", id);

  if (error) throw new Error("Gagal menghapus publikasi!");
};
