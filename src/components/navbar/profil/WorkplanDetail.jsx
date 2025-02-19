import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase/supabaseClient";

const WorkplanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workplan, setWorkplan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkplan = async () => {
      const { data, error } = await supabase
        .from("rencana_kerja")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching workplan:", error);
        return;
      }
      setWorkplan(data);
      setLoading(false);
    };

    fetchWorkplan();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Memuat detail rencana kerja...</p>;
  if (!workplan) return <p className="text-center text-red-500">Data tidak ditemukan.</p>;

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0.2),0_10px_30px_rgba(0,0,0,0.3)]">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">← Kembali</button>
      
      <h1 className="text-3xl text-center uppercase font-bold mb-4">{workplan.title}</h1>
      <p className="text-sm text-gray-500 text-center mb-6">Diupload pada {new Date(workplan.created_at).toLocaleString()}</p>

      {/* Media */}
      {workplan.media && (
        <>
          <h2 className="text-xl font-semibold mb-2">Media:</h2>

          {workplan.media.endsWith(".mp4") ? (
            <video controls className="w-full rounded-lg">
              <source src={supabase.storage.from("media-uploads").getPublicUrl(workplan.media).data.publicUrl} type="video/mp4" />
            </video>
          ) : 
          workplan.media.endsWith(".pdf") ? (
            <iframe 
              src={supabase.storage.from("media-uploads").getPublicUrl(workplan.media).data.publicUrl} 
              className="w-full h-[600px] border border-gray-300 rounded-lg"
              title="PDF Viewer"
            />
          ) : (
            <a href={supabase.storage.from("media-uploads").getPublicUrl(workplan.media).data.publicUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Buka Dokumen
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default WorkplanDetail;
