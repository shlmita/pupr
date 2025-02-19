import { supabase } from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";

export const uploadArtikel = async ({ id, judul, isi, thumbnailFile, gambarArtikel }) => {
    try {
        console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
        console.log("gambarArtikel:", gambarArtikel);

        let thumbnailUrl = "";
        
        // Jika ada file thumbnail baru, upload dan hapus yang lama
        if (thumbnailFile) {
            const uniqueThumbnailName = `thumbnails/${uuidv4()}_${thumbnailFile.name}`;
            const { data, error } = await supabase.storage
                .from("media")
                .upload(uniqueThumbnailName, thumbnailFile, { upsert: true });

            if (error) {
                console.error("Error upload thumbnail:", error.message);
                throw error;
            }

            const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(uniqueThumbnailName);
            thumbnailUrl = publicUrlData?.publicUrl || "";
            console.log("Thumbnail URL:", thumbnailUrl);

            // Hapus thumbnail lama jika dalam mode edit
            if (id) {
                const { data: oldData } = await supabase.from("artikel").select("thumbnail").eq("id", id).single();
                if (oldData?.thumbnail) {
                    const oldThumbnailPath = oldData.thumbnail.split("/").pop();
                    await supabase.storage.from("media").remove([`thumbnails/${oldThumbnailPath}`]);
                }
            }
        }

        // Upload gambar artikel baru ke Supabase Storage
        let gambarUrls = ["", "", ""];
        let posisiGambar = ["", "", ""];

        for (let i = 0; i < gambarArtikel.length && i < 3; i++) {
            const file = gambarArtikel[i]?.file;
            const posisi = gambarArtikel[i]?.posisi;
            if (!file) continue;

            const uniqueFileName = `artikel/${uuidv4()}_${file.name}`;
            const { data, error } = await supabase.storage
                .from("media")
                .upload(uniqueFileName, file, { upsert: true });

            if (error) {
                console.error(`Error upload gambar ke-${i + 1}:`, error.message);
                throw error;
            }

            // Ambil URL setelah upload
            const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(uniqueFileName);
            const publicUrl = publicUrlData?.publicUrl || "";
            gambarUrls[i] = publicUrl;
            posisiGambar[i] = posisi || "";

            console.log(`Gambar ${i + 1} URL:`, publicUrl);

            // Hapus gambar lama jika dalam mode edit
            if (id) {
                const { data: oldData } = await supabase.from("artikel").select(`gambar${i + 1}`).eq("id", id).single();
                if (oldData?.[`gambar${i + 1}`]) {
                    const oldGambarPath = oldData[`gambar${i + 1}`].split("/").pop();
                    await supabase.storage.from("media").remove([`artikel/${oldGambarPath}`]);
                }
            }
        }

        let query;
        if (id) {
            // Update artikel yang sudah ada
            query = supabase.from("artikel").update({
                judul,
                isi,
                ...(thumbnailFile && { thumbnail: thumbnailUrl }),
                ...(gambarArtikel.length > 0 && {
                    gambar1: gambarUrls[0],
                    posisi_gambar1: posisiGambar[0],
                    gambar2: gambarUrls[1],
                    posisi_gambar2: posisiGambar[1],
                    gambar3: gambarUrls[2],
                    posisi_gambar3: posisiGambar[2]
                })
            }).eq("id", id);
        } else {
            // Insert artikel baru
            query = supabase.from("artikel").insert([{
                judul,
                isi,
                thumbnail: thumbnailUrl,
                gambar1: gambarUrls[0],
                posisi_gambar1: posisiGambar[0],
                gambar2: gambarUrls[1],
                posisi_gambar2: posisiGambar[1],
                gambar3: gambarUrls[2],
                posisi_gambar3: posisiGambar[2]
            }]);
        }

        const { data: result, error: queryError } = await query;
        if (queryError) {
            console.error("Error menyimpan ke database:", queryError.message);
            throw queryError;
        }

        console.log("Data yang disimpan ke database:", result);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error upload artikel:", error.message);
        return { success: false, error: error.message };
    }
};
