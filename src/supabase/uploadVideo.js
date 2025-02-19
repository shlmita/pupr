import { supabase } from "./supabaseClient";

export const uploadVideo = async ({ title, video }) => {
  if (!video) {
    console.error("Error: No video file provided.");
    throw new Error("No video provided");
  }

  let videoUrl = "";

  if (video instanceof File) {
    const fileName = `${Date.now()}-${video.name}`;

    // 🔹 Upload ke Supabase Storage
    const { data, error } = await supabase.storage.from("videos").upload(fileName, video);

    if (error) {
      console.error("Storage upload error:", error);
      throw new Error("Gagal mengunggah video ke storage");
    }

    // 🔹 Ambil URL dari file yang diupload
    const { data: publicUrlData } = supabase.storage.from("videos").getPublicUrl(fileName);
    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error("Error: Gagal mendapatkan URL publik.");
      throw new Error("Gagal mendapatkan URL video.");
    }

    videoUrl = publicUrlData.publicUrl;
  } else {
    videoUrl = video; // Jika menggunakan URL langsung
  }

  console.log("Final Video URL:", videoUrl); // 🔍 Debugging

  // 🔹 Pastikan URL tidak kosong sebelum menyimpan ke database
  if (!videoUrl) {
    console.error("Error: Video URL is empty.");
    throw new Error("Video URL tidak valid.");
  }

  // 🔹 Simpan ke database
  const { data, error: insertError } = await supabase.from("videos").insert([{ title, video: videoUrl }]);

  if (insertError) {
    console.error("Database insert error:", insertError);
    throw insertError;
  }

  return data;
};


export const getVideos = async () => {
  const { data, error } = await supabase.from("videos").select("*");
  if (error) throw error;
  return data;
};

export const getVideoById = async (id) => {
  const { data, error } = await supabase.from("videos").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
};

export const deleteVideo = async (id) => {
  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) throw error;
};

export const updateVideo = async (id, newTitle, newVideo) => {
  let videoUrl = newVideo;

  if (newVideo instanceof File) {
    const fileName = `${Date.now()}-${newVideo.name}`;

    // 🔹 Upload file baru ke Supabase Storage
    const { data, error } = await supabase.storage.from("videos").upload(fileName, newVideo);
    if (error) {
      console.error("Storage upload error:", error);
      throw new Error("Gagal mengunggah video ke storage");
    }

    // 🔹 URL video baru dari Supabase
    videoUrl = `https://your-supabase-url.storage.supabase.co/videos/${fileName}`;

    const { data: publicUrlData } = supabase.storage.from("videos").getPublicUrl(fileName);
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Gagal mendapatkan URL video.");
      }
      videoUrl = publicUrlData.publicUrl;

  }

  console.log("Mengupdate video ID:", id);
  console.log("Judul baru:", newTitle);
  console.log("URL video baru:", videoUrl);

  // 🔹 Update data di database
  const { data, error: updateError } = await supabase
    .from("videos")
    .update({ title: newTitle, video: videoUrl })
    .eq("id", id)
    .select(); // Tambahkan ini agar hasil update dikembalikan
    let newVideoUrl = editVideo.video;
    if (video) {
      const { data, error } = await supabase.storage.from("videos").upload(`videos/${video.name}`, video);
      if (error) throw error;
    
      const { data: publicUrlData } = supabase.storage.from("videos").getPublicUrl(`videos/${video.name}`);
      if (!publicUrlData || !publicUrlData.publicUrl) throw new Error("Gagal mendapatkan URL video.");
      
      newVideoUrl = publicUrlData.publicUrl;
    }
    
    await updateVideo(editVideo.id, editVideo.title, newVideoUrl);    

  if (updateError) {
    console.error("Database update error:", updateError);
    throw updateError;
  }

  return data;
};

