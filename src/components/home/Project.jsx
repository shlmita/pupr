import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FadeInSection from "../FadeInSection";
import "../../styles/Project.css";
import { supabase } from "../../supabase/supabaseClient";

const truncateText = (text, maxLength, isUpperCase = false) => {
  let truncatedText = text.length > maxLength ? text.slice(0, maxLength).trim() + "..." : text;
  return isUpperCase ? truncatedText.toUpperCase() : truncatedText;
};

const defaultImage = "/public/kabupaten.png";

const Project = () => {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching news:", error);
        return;
      }
      setNewsList(data);
    };

    fetchNews();
  }, []);

  return (
    <div className="proyek px-4 lg:px-8">
      <FadeInSection>
        <h1 className="text-center lg:text-5xl/tight text-3xl font-medium mb-2">BERITA</h1>
        <p className="text-center">Temukan informasi terkini dan terbaru di sini.</p>
      </FadeInSection>

      <div className="proyek-box grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:items-stretch lg:overflow-x-auto lg:space-x-4 gap-5 pt-10 lg:scrollbar-hide">
        {newsList.map((news) => (
          <FadeInSection key={news.id}>
            <div
              className="box flex-shrink-0 w-full lg:w-80 min-h-[380px] h-full flex flex-col rounded-lg bg-sky-950 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/news/${news.id}`)} // Navigasi ke halaman detail
            >
              <img
                src={news.thumbnail || defaultImage}
                alt="Thumbnail"
                className="w-full h-[230px] object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="p-2 px-3 flex-grow">
                <h4 className="text-3xl font-bold text-white mt-2 mb-2 uppercase">
                  {truncateText(news.title, 15, true)}
                </h4>
                <p className="text-white text-base overflow-hidden clamp-3-lines pb-1">
                  {truncateText(news.content, 100)}
                </p>
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

export default Project;
