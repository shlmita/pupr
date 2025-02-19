import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FadeInSection from "../../FadeInSection";
import "../../../styles/Project.css";
import { supabase } from "../../../supabase/supabaseClient";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength).trim() + "..." : text;
};

const defaultImage = "/public/kabupaten.png"; // Gambar default jika tidak ada thumbnail

const Publikasi = () => {
  const [publikasiList, setPublikasiList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublikasi = async () => {
      const { data, error } = await supabase
        .from("publikasi")
        .select("id, title, thumbnail, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching publikasi:", error);
        return;
      }
      console.log("Fetched publikasi:", data);
      setPublikasiList(data);
    };

    fetchPublikasi();
  }, []);

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0),0_10px_30px_rgba(0,0,0,0.3)]">
      <FadeInSection>
        <h1 className="p-5 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2">
          Publikasi
        </h1>
        <p className="-mt-5 text-center text-sm sm:text-base">Daftar publikasi terbaru.</p>
      </FadeInSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-5 pt-8 sm:pt-10">
        {publikasiList.map((publikasi) => (
          <FadeInSection key={publikasi.id}>
            <div
              className="box w-full flex flex-col rounded-lg bg-sky-950 overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate(`/publikasi/${publikasi.id}`)}
            >
              <img
                src={
                  publikasi.thumbnail
                    ? supabase.storage.from("media-uploads").getPublicUrl(publikasi.thumbnail)?.data?.publicUrl || defaultImage
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
                  {truncateText(publikasi.title, 20)}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300">{new Date(publikasi.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
        {publikasiList.length === 0 && (
          <p className="text-gray-500 text-center w-full">Tidak ada publikasi untuk ditampilkan.</p>
        )}
      </div>
    </div>
  );
};

export default Publikasi;
