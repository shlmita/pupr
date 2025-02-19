import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FadeInSection from "../../FadeInSection";
import "../../../styles/Project.css";
import { supabase } from "../../../supabase/supabaseClient";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength).trim() + "..." : text;
};

// Gambar default jika video bukan dari YouTube
const defaultThumbnail = "/public/kabupaten.png"; 

// 🔹 Fungsi untuk mendapatkan thumbnail YouTube dari URL
const getYoutubeThumbnail = (videoUrl) => {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = videoUrl.match(youtubeRegex);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
};

const Video = () => {
  const [videoList, setVideoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("id, title, video, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching video:", error);
        return;
      }
      console.log("Fetched video:", data);
      setVideoList(data);
    };

    fetchVideo();
  }, []);

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0),0_10px_30px_rgba(0,0,0,0.3)]">
      <FadeInSection>
        <h1 className="p-5 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2">
          Video
        </h1>
        <p className="-mt-5 text-center text-sm sm:text-base">Daftar video terbaru.</p>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-5 pt-8 sm:pt-10">
        {videoList.map((videos) => {
          const youtubeThumbnail = getYoutubeThumbnail(videos.video);
          const thumbnail = youtubeThumbnail || defaultThumbnail; // 🔹 Pilih thumbnail yang tersedia

          return (
            <FadeInSection key={videos.id}>
              <div
                className="box w-full flex flex-col rounded-lg bg-sky-950 overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all"
                onClick={() => navigate(`/video/${videos.id}`)}
              >
                <img
                  src={thumbnail} // 🔹 Tampilkan thumbnail YouTube atau default
                  className="w-full h-40 sm:h-44 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
                  alt="Thumbnail"
                  onError={(e) => {
                    console.warn("Error loading image, switching to default:", e.target.src);
                    e.target.src = defaultThumbnail;
                  }}
                />
                <div className="p-3 flex-grow">
                  <h4 className="text-base sm:text-lg font-bold text-white mt-2 mb-1 uppercase">
                    {truncateText(videos.title, 20)}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {new Date(videos.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </FadeInSection>
          );
        })}
        {videoList.length === 0 && (
          <p className="text-gray-500 text-center w-full">Tidak ada video untuk ditampilkan.</p>
        )}
      </div>
    </div>
  );
};

export default Video;
