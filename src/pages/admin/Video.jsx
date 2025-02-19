import { useState, useEffect } from "react";
import { uploadVideo, getVideos, deleteVideo, updateVideo } from "../../supabase/uploadVideo";
import { useNavigate } from "react-router-dom";

export default function VideoAdmin() {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadType, setUploadType] = useState("file");
  const [videos, setVideos] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editVideo, setEditVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const data = await getVideos();
    console.log("Data video terbaru:", data);
    setVideos(data);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || (uploadType === "file" && !video) || (uploadType === "url" && !videoUrl)) {
      window.alert("Upload gagal: Data tidak lengkap!");
      return;
    }

    try {
      await uploadVideo({ title, video: uploadType === "file" ? video : videoUrl });
      window.alert("✅ Upload berhasil!");
      setTitle("");
      setVideo(null);
      setVideoUrl("");
      fetchVideos();
    } catch (error) {
      window.alert(`❌ Upload gagal: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus video ini?")) {
      await deleteVideo(id);
      fetchVideos();
    }
  };

  const handleEdit = (vid) => {
    setEditVideo(vid);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editVideo.id) {
      console.error("ID video tidak ditemukan!");
      return;
    }
  
    try {
      console.log(`Mengupdate video ID: ${editVideo.id}`);
      console.log(`Judul baru: ${editVideo.title}`);
      console.log(`URL video baru: ${video ? video.name : editVideo.video}`);
  
      // Cek apakah user mengunggah file baru
      let newVideoUrl = editVideo.video;
      if (video) {
        const { data, error } = await supabase.storage.from("videos").upload(`videos/${video.name}`, video);
        if (error) throw error;
        newVideoUrl = data.path; // Simpan path baru dari Supabase
      }
  
      await updateVideo(editVideo.id, editVideo.title, newVideoUrl);
      window.alert("✅ Video berhasil diperbarui!");
  
      fetchVideos(); // Refresh data
      setEditModal(false);
    } catch (error) {
      window.alert(`❌ Gagal memperbarui video: ${error.message}`);
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Video Management</h1>
      
      {/* Form Upload */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Video</h2>

        <input
          type="text"
          placeholder="Judul Video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="file"
              checked={uploadType === "file"}
              onChange={() => setUploadType("file")}
              className="mr-2"
            />
            Upload File
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="url"
              checked={uploadType === "url"}
              onChange={() => setUploadType("url")}
              className="mr-2"
            />
            Upload via URL
          </label>
        </div>

        {uploadType === "file" && (
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  console.log("📂 File terpilih:", e.target.files[0]);
                  setVideo(e.target.files[0]);
                } else {
                  console.log("⚠️ Tidak ada file yang dipilih!");
                }
              }}
              className="w-full p-2 border rounded mb-4"
            />
        )}

        {uploadType === "url" && (
          <input
            type="text"
            placeholder="Masukkan URL video"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
        )}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Upload
        </button>
      </form>

      {/* Tabel Video */}
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Daftar Video</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Judul</th>
              <th className="p-3 border">Video</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {videos.length > 0 ? (
              videos.map((vid) => (
                <tr key={vid.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{vid.title}</td>
                  <td className="p-3 border">
                    <video controls className="w-32">
                      <source src={vid.video} type="video/mp4" />
                    </video>
                  </td>
                  <td className="p-3 border space-x-2">
                    <button 
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded" 
                      onClick={() => navigate(`/video/${vid.id}`)}>Lihat
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => handleEdit(vid)}>
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(vid.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  Tidak ada video yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Edit */}
      {editModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Edit Video</h2>

              {/* Preview Video Sebelumnya */}
              {editVideo.video && !video && (
                <video controls className="w-full mb-4">
                  <source src={editVideo.video} type="video/mp4" />
                </video>
              )}

              {/* Preview Video Baru Jika Diupload */}
              {video && (
                <video controls className="w-full mb-4">
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                </video>
              )}

              <input
                type="text"
                value={editVideo.title}
                onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />

              <input 
                type="file" 
                accept="video/*" 
                onChange={(e) => setVideo(e.target.files[0])} 
                className="w-full p-2 border rounded mb-4" 
              />

              <button 
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" 
                onClick={handleUpdate}
              >
                Simpan Perubahan
              </button>
          
              <button 
                className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition" 
                onClick={() => setEditModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        )}

    </div>
  );
}
