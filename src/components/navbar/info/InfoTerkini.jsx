import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FadeInSection from "../../FadeInSection";
import "../../../styles/Project.css";
import { supabase } from "../../../supabase/supabaseClient";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength).trim() + "..." : text;
};

const defaultImage = "/kabupaten.png"; // Path gambar default diperbaiki

const InfoTerkini = () => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, content, thumbnail, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
        return;
      }
      console.log("Fetched news:", data);
      setNewsList(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0),0_10px_30px_rgba(0,0,0,0.3)]">
      <FadeInSection>
        <h1 className="p-5 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2">
          Berita Terbaru
        </h1>
        <p className="-mt-5 text-center text-sm sm:text-base">Daftar berita terbaru yang tersedia.</p>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-5 pt-8 sm:pt-10">
        {newsList.map((news) => (
          <FadeInSection key={news.id}>
            <div
              className="box w-full flex flex-col rounded-lg bg-sky-950 overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <img
                src={
                  news.thumbnail
                    ? supabase.storage.from("media-uploads").getPublicUrl(news.thumbnail) || defaultImage
                    : defaultImage
                }
                alt="Thumbnail"
                className="w-full h-40 sm:h-44 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  console.warn("Error loading image, switching to default:", e.target.src);
                  e.target.src = defaultImage;
                }}
              />
              <div className="p-3 flex-grow">
                <h4 className="text-base sm:text-lg font-bold text-white mt-2 mb-1 uppercase">
                  {truncateText(news.title, 20)}
                </h4>
                <p className="text-white text-base overflow-hidden clamp-3-lines pb-1">
                  {truncateText(news.content, 100)}
                </p>
                <p className="text-xs sm:text-sm text-gray-300">{new Date(news.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
        {newsList.length === 0 && (
          <p className="text-gray-500 text-center w-full">Tidak ada berita untuk ditampilkan.</p>
        )}
      </div>
    </div>
  );
};

export default InfoTerkini;
