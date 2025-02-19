import { supabase } from "./supabaseClient";

export const uploadRencanaKerja = async (judul, gambar, pdf) => {
  try {
    // Generate nama file unik
    const imgPath = `images/${Date.now()}_${gambar.name}`;
    const pdfPath = `pdfs/${Date.now()}_${pdf.name}`;

    // Upload gambar ke storage Supabase
    const { data: gambarData, error: gambarError } = await supabase
      .storage
      .from("media-uploads")
      .upload(imgPath, gambar);
    
    if (gambarError) throw gambarError;

    // Upload PDF ke storage Supabase
    const { data: pdfData, error: pdfError } = await supabase
      .storage
      .from("media-uploads")
      .upload(pdfPath, pdf);
    
    if (pdfError) throw pdfError;

    // Simpan data ke tabel rencana_kerja
    const { data, error } = await supabase
      .from("rencana_kerja")
      .insert([
        {
          judul,
          gambar_url: gambarData.path,
          pdf_url: pdfData.path,
        },
      ]);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error uploading rencana kerja:", error.message);
    return null;
  }
};

// Fungsi untuk mengambil daftar rencana kerja dari Supabase
export const getRencanaKerja = async () => {
  try {
    const { data, error } = await supabase.from("rencana_kerja").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching rencana kerja:", error.message);
    return [];
  }
};
