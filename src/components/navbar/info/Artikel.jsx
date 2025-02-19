import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabase/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import FadeInSection from "../../FadeInSection";

const Artikel = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase.from("artikel").select("*");

      if (error) console.error("Error fetching articles:", error);
      else setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-11px_21px_rgba(0,0,0,0),0_11px_31px_rgba(0,0,0,0.3)]">
      <FadeInSection>
        <h1 className="p-5 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2">
          Artikel
        </h1>
        <p className="-mt-5 text-center text-sm sm:text-base">Daftar Artikel terbaru.</p>
      </FadeInSection>
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-sky-900 rounded-lg shadow-lg shadow-gray-800 overflow-hidden w-full transform transition-all hover:scale-105 hover:shadow-2xl"
              onClick={() => navigate(`/artikel/${article.id}`)}
            >
              <div className="flex flex-col md:flex-row p-4">
                <img
                  src={article.thumbnail}
                  alt={article.judul}
                  className="md:w-1/2 lg:w-1/3 rounded-lg h-48 object-cover mb-4 md:mb-0"
                />

                <div className="md:w-full px-5">
                  <h2 className="text-xl font-semibold text-white mb-2">{article.judul}</h2>
                  <p className="text-white text-sm mb-4 line-clamp-4">{article.isi}</p>

                  {/* Menampilkan jumlah suka dan tidak suka */}
                  <div className="flex items-center text-white text-sm gap-4">
                    <div className="flex items-center">
                      <FaThumbsUp className="text-md mr-1" /> {article.likes || 0}
                    </div>
                    <div className="flex items-center">
                      <FaThumbsDown className="text-md mr-1" /> {article.dislikes || 0}
                    </div>
                  </div>

                  <Link to={`/artikel/${article.id}`} className="text-white hover:text-sky-950 font-medium text-sm mt-2 block">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artikel;
