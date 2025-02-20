import { supabase } from "./supabaseClient";

// ✅ Tambah Data Buku Tamu
export const tambahBukuTamu = async (nama, email, pesan) => {
  const { data, error } = await supabase.from("buku_tamu").insert([{ nama, email, pesan }]);
  return { data, error };
};

// ✅ Ambil Semua Data Buku Tamu
export const ambilBukuTamu = async () => {
  const { data, error } = await supabase.from("buku_tamu").select("*").order("created_at", { ascending: false });
  return { data, error };
};

// ✅ Hapus Data Buku Tamu
export const hapusBukuTamu = async (id) => {
  const { error } = await supabase.from("buku_tamu").delete().eq("id", id);
  return { error };
};

// ✅ Edit Data Buku Tamu
export const editBukuTamu = async (id, nama, email, pesan) => {
  const { data, error } = await supabase.from("buku_tamu").update({ nama, email, pesan }).eq("id", id);
  return { data, error };
};
