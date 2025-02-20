import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase/supabaseClient";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const ArtikelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artikel, setArtikel] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    const fetchArtikel = async () => {
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching article:", error);
      else {
        setArtikel({
          ...data,
          posisi_gambar1: data.posisi_gambar1 || "atas",
          posisi_gambar2: data.posisi_gambar2 || "atas",
          posisi_gambar3: data.posisi_gambar3 || "atas",
        });
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
      }
    };

    fetchArtikel();
  }, [id]);

  const updateLikes = async (type) => {
    const newLikes = type === "like" ? likes + 1 : likes;
    const newDislikes = type === "dislike" ? dislikes + 1 : dislikes;

    const { error } = await supabase
      .from("artikel")
      .update({ likes: newLikes, dislikes: newDislikes })
      .eq("id", id);

    if (!error) {
      setLikes(newLikes);
      setDislikes(newDislikes);
    }
  };

  if (!artikel) return <p className="text-center text-gray-500">Memuat artikel...</p>;

  // Fungsi untuk cek apakah teks mengandung Markdown
  const isMarkdown = (text) => {
    return /(^|\s)([*_~`#-])/m.test(text); // Deteksi karakter Markdown
  };

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-xl rounded-lg">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold mb-2 text-gray-800 uppercase text-center">{artikel.judul}</h1>

      <p className="text-gray-500 text-sm mb-4 text-center">
        {new Date(artikel.tanggal_upload).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Suka dan Tidak Suka */}
      <div className="flex justify-center -mt-3 mb-5">
        <button onClick={() => updateLikes("like")} className="flex items-center cursor-pointer px-4 py-2 text-gray-600">
          <FaThumbsUp className="text-md mr-2" />
          <span className="text-sm">{likes}</span>
        </button>
        <button onClick={() => updateLikes("dislike")} className="flex items-center cursor-pointer px-4 py-2 text-gray-600">
          <FaThumbsDown className="text-md mr-2" />
          <span className="text-sm">{dislikes}</span>
        </button>
      </div>

      {/* Gambar di Atas (Center) */}
      <div className="flex flex-col items-center mb-4">
        {artikel.posisi_gambar1 === "atas" && artikel.gambar1 && (
          <img src={artikel.gambar1} alt="Gambar 1" className="w-full max-w-lg max-h-72 object-cover rounded-lg" />
        )}
        {artikel.posisi_gambar2 === "atas" && artikel.gambar2 && (
          <img src={artikel.gambar2} alt="Gambar 2" className="w-full max-w-lg max-h-72 object-cover rounded-lg" />
        )}
        {artikel.posisi_gambar3 === "atas" && artikel.gambar3 && (
          <img src={artikel.gambar3} alt="Gambar 3" className="w-full max-w-lg max-h-72 object-cover rounded-lg" />
        )}
      </div>

      {/* Isi Artikel (Cek Markdown atau Teks Biasa) */}
      <div className="prose prose-lg text-gray-700 leading-relaxed mb-6">
        {isMarkdown(artikel.isi) ? (
          <ReactMarkdown>{artikel.isi}</ReactMarkdown>
        ) : (
          <p className="whitespace-pre-line">{artikel.isi}</p>
        )}
      </div>

      {/* Gambar di Bawah (Center) */}
      <div className="flex flex-col items-center space-y-4 px-4">
        {artikel.posisi_gambar1 === "bawah" && artikel.gambar1 && (
          <img src={artikel.gambar1} alt="Gambar 1" className="w-full max-w-lg max-h-72 object-cover rounded-lg" />
        )}
        {artikel.posisi_gambar2 === "bawah" && artikel.gambar2 && (
          <img src={artikel.gambar2} alt="Gambar 2" className="w-full max-w-lg max-h-72 object-cover rounded-lg" />
        )}
        {artikel.posisi_gambar3 === "bawah" && artikel.gambar3 && (
          <img src={artikel.gambar3} alt="Gambar 3" className="w-full max-w-lg max-h-72 object-cover rounded-lg" />
        )}
      </div>
    </div>
  );
};

export default ArtikelDetail;
