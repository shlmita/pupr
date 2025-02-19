import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoById } from "../../../supabase/uploadVideo";

function getYouTubeID(url) {
  const regExp = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      const data = await getVideoById(id);
      setVideo(data);
    }
    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-11px_21px_rgba(0,0,0,0.2),0_11px_31px_rgba(0,0,0,0.3)]">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold mb-2 uppercase text-center">{video.title}</h1>
      <p className="text-gray-600 mb-4 text-center">Tanggal: {new Date(video.created_at).toLocaleDateString()}</p>
      
      <div className="mx-28 border rounded p-4 bg-gray-100">
      {video.video.includes("youtube.com") || video.video.includes("youtu.be") ? (
        <iframe 
          src={`https://www.youtube.com/embed/${getYouTubeID(video.video)}`} 
          title={video.title} 
          className="w-full h-96"
          allowFullScreen
        />
      ) : (
        <video controls className="w-full">
          <source src={video.video} type="video/mp4" />
          Browser Anda tidak mendukung pemutaran video.
        </video>
      )}
      </div>

      <div className="mt-4 flex space-x-4">
        <a href={video.video} download className="bg-sky-900 hover:bg-sky-950 text-white px-4 py-2 rounded">Download Video</a>
        {video.video.includes("youtube.com") && (
        <a href={video.video} target="_blank" rel="noopener noreferrer" className="bg-red-500 text-white px-4 py-2 rounded">Buka di YouTube</a>
        )}
      </div>
    </div>
  );
}
