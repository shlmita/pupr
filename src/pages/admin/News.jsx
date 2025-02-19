import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadMedia, getMediaUrl } from "../../supabase/uploadMedia";
import { supabase } from "../../supabase/supabaseClient";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [newNews, setNewNews] = useState({ title: "", content: "", thumbnail: "", media: "" });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editNewsId, setEditNewsId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setNewsList(data);
    } catch (err) {
      console.error("Error fetching news:", err);
      alert("Gagal memuat berita.");
    }
  };

  const handleFileChange = (e, type) => {
    if (type === "thumbnail") {
      setThumbnailFile(e.target.files[0]);
    } else {
      setMediaFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (!newNews.title || !newNews.content) {
      alert("Judul dan deskripsi harus diisi!");
      return;
    }
    setIsLoading(true);
    try {
      let thumbnailUrl = newNews.thumbnail;
      let mediaUrl = newNews.media;

      if (thumbnailFile) {
        const thumbPath = await uploadMedia(thumbnailFile, "news-thumbnails");
        thumbnailUrl = getMediaUrl(thumbPath);
      }

      if (mediaFile) {
        const mediaPath = await uploadMedia(mediaFile, "news-media");
        mediaUrl = getMediaUrl(mediaPath);
      }

      if (editMode) {
        await supabase.from("news").update({ title: newNews.title, content: newNews.content, thumbnail: thumbnailUrl, media: mediaUrl }).eq("id", editNewsId);
      } else {
        await supabase.from("news").insert([{ title: newNews.title, content: newNews.content, thumbnail: thumbnailUrl, media: mediaUrl }]);
      }

      alert(editMode ? "Berita berhasil diperbarui!" : "Berita berhasil ditambahkan!");
      fetchNews();
      setNewNews({ title: "", content: "", thumbnail: "", media: "" });
      setThumbnailFile(null);
      setMediaFile(null);
      setEditMode(false);
    } catch (error) {
      console.error("Gagal menyimpan berita:", error);
      alert("Gagal menyimpan berita.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus berita ini?");
    if (!confirmDelete) return;
    
    try {
      await supabase.from("news").delete().eq("id", id);
      alert("Berita berhasil dihapus!");
      fetchNews();
    } catch (error) {
      console.error("Gagal menghapus berita:", error);
      alert("Gagal menghapus berita.");
    }
  };

  const handleEdit = (news) => {
    setEditMode(true);
    setEditNewsId(news.id);
    setNewNews({ title: news.title, content: news.content, thumbnail: news.thumbnail, media: news.media });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Kelola Berita</h1>

      <div className="space-y-4">
        <label className="block font-bold text-gray-700">Judul Berita</label>
        <input type="text" name="title" value={newNews.title} onChange={handleInputChange} className="w-full p-2 border rounded-lg" placeholder="Masukkan judul berita" />

        <label className="block font-bold text-gray-700">Deskripsi Berita</label>
        <textarea name="content" value={newNews.content} onChange={handleInputChange} className="w-full p-2 border rounded-lg" placeholder="Masukkan deskripsi berita"></textarea>

        <label className="block font-bold text-gray-700">Upload Gambar Thumbnail</label>
        <input type="file" onChange={(e) => handleFileChange(e, "thumbnail")} className="w-full p-2 border rounded-lg" />
        {newNews.thumbnail && <img src={newNews.thumbnail} alt="Thumbnail" className="w-32 h-32 object-cover rounded-lg" />}

        <label className="block font-bold text-gray-700">Upload Media</label>
        <input type="file" onChange={(e) => handleFileChange(e, "media")} className="w-full p-2 border rounded-lg" />
        {newNews.media && <a href={newNews.media} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lihat Media</a>}
        
        <button onClick={handleUpload} disabled={isLoading} className="w-full bg-sky-950 text-white py-2 rounded-lg hover:bg-sky-900 disabled:bg-gray-300">
          {isLoading ? "Menyimpan..." : editMode ? "Simpan Perubahan" : "Tambahkan Berita"}
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-sky-800 text-white">
              <th className="p-3 border">Judul</th>
              <th className="p-3 border">Deskripsi</th>
              <th className="p-3 border">Thumbnail</th>
              <th className="p-3 border">Media</th>
              <th className="p-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((news) => (
              <tr key={news.id} className="border hover:bg-gray-100 transition-all">
                <td className="p-3 border">{news.title}</td>
                <td className="p-3 border">{news.content}</td>
                <td className="p-3 border">{news.thumbnail && <img src={news.thumbnail} alt="Thumbnail" className="w-16 h-16 object-cover rounded-lg" />}</td>
                <td className="p-3 border">{news.media ? <a href={news.media} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lihat Media</a> : "-"}</td>
                <td className="p-3 border flex space-x-2">
                  <button onClick={() => navigate(`/news/${news.id}`)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Lihat</button>
                  <button onClick={() => handleEdit(news)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(news.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default News;
