import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase/supabaseClient";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

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
        setArtikel(data);
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

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg">
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

      <p className="text-base leading-relaxed text-gray-700">{artikel.isi}</p>
    </div>
  );
};

export default ArtikelDetail;
