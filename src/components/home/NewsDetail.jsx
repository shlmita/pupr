import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      const { data, error } = await supabase.from("news").select("*").eq("id", id).single();
      if (error) {
        console.error("Error fetching news detail:", error);
        return;
      }
      setNews(data);
      setLoading(false);
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Memuat berita...</p>;
  if (!news) return <p className="text-center text-red-500">Berita tidak ditemukan.</p>;

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0.2),0_10px_30px_rgba(0,0,0,0.3)] mb-10">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">← Kembali</button>
      <h1 className="text-3xl text-center uppercase font-bold mb-4">{news.title}</h1>

      <p className="text-lg text-gray-800 mb-4">{news.content}</p>

      {news.media && (
        <>
          <h2 className="text-xl font-semibold mb-2">Media:</h2>

          {/* Jika media adalah video */}
          {news.media.endsWith(".mp4") ? (
            <video controls className="w-full rounded-lg">
              <source src={news.media} type="video/mp4" />
            </video>
          ) : 
          /* Jika media adalah gambar */
          (news.media.endsWith(".jpg") || news.media.endsWith(".jpeg") || news.media.endsWith(".png")) ? (
            <img src={news.media} alt="News Media" className="w-full rounded-lg" />
          ) : 
          /* Jika media adalah PDF, tampilkan dalam iframe */
          news.media.endsWith(".pdf") ? (
            <iframe 
              src={news.media} 
              className="w-full h-[600px] border border-gray-300 rounded-lg"
              title="PDF Viewer"
            />
          ) : 
          /* Jika media bukan gambar, video, atau PDF, tampilkan link */
          (
            <a href={news.media} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Buka Dokumen
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default NewsDetail;
