import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadMedia, getMediaUrl } from "../../supabase/uploadMedia";
import { supabase } from "../../supabase/supabaseClient";

const Publikasi = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [publikasiList, setPublikasiList] = useState([]);
  const [editPublikasi, setEditPublikasi] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (editPublikasi) {
      setTitle(editPublikasi.title || "");
      setThumbnailPreview(editPublikasi.thumbnail || null);
      setMediaPreview(editPublikasi.media || null);
    }
  }, [editPublikasi]);  

  const fetchPublikasi = async () => {
    const { data, error } = await supabase.from("publikasi").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching publikasi:", error);
      alert("Gagal memuat publikasi");
      return;
    }
    setPublikasiList(data);
  };

  useEffect(() => {
    fetchPublikasi();
  }, []);
  

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Judul harus diisi!");
      return;
    }
  
    let thumbnailUrl = editPublikasi?.thumbnail || "";
    let mediaUrl = editPublikasi?.media || "";
  
    if (thumbnail) {
      const thumbPath = await uploadMedia(thumbnail, "publikasi-thumbnails");
      thumbnailUrl = getMediaUrl(thumbPath);
    }
  
    if (media) {
      const mediaPath = await uploadMedia(media, "publikasi-media");
      mediaUrl = getMediaUrl(mediaPath);
    }
  
    if (editPublikasi) {
      const { error } = await supabase
        .from("publikasi")
        .update({ title, thumbnail: thumbnailUrl, media: mediaUrl })
        .eq("id", editPublikasi.id);
    
      if (error) {
        console.error("Gagal update publikasi:", error);
        alert("Gagal memperbarui publikasi!");
        return;
      }
  
      alert("Publikasi berhasil diperbarui!");
    } else {
      const { error } = await supabase
        .from("publikasi")
        .insert([{ title, thumbnail: thumbnailUrl, media: mediaUrl }]);
  
      if (error) {
        console.error("Gagal menambahkan publikasi:", error);
        alert("Gagal menambahkan publikasi!");
        return;
      }
  
      alert("Publikasi berhasil ditambahkan!");
    }
  
    fetchPublikasi(); // 🔄 Refresh daftar publikasi setelah tambah/edit
    setTitle("");
    setThumbnail(null);
    setThumbnailPreview(null);
    setMedia(null);
    setMediaPreview(null);
    setEditPublikasi(null);
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus publikasi ini?")) return;
    await supabase.from("publikasi").delete().eq("id", id);
    alert("Publikasi berhasil dihapus!");
    fetchPublikasi();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Kelola Publikasi</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <label className="block font-bold text-gray-700">Judul Publikasi</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded-lg" required />

        <label className="block font-bold text-gray-700">Upload Gambar Thumbnail</label>
        <input type="file" accept="image/*" onChange={(e) => { setThumbnail(e.target.files[0]); setThumbnailPreview(URL.createObjectURL(e.target.files[0])); }} className="w-full p-2 border rounded-lg" />
        {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail Preview" className="h-16 mt-2" />}

        <label className="block font-bold text-gray-700">Upload Media</label>
        <input type="file" onChange={(e) => { setMedia(e.target.files[0]); setMediaPreview(URL.createObjectURL(e.target.files[0])); }} className="w-full p-2 border rounded-lg" />
        {mediaPreview && <a href={mediaPreview} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lihat Media</a>}

        <div className="flex gap-2">
  <button type="submit" className="bg-sky-900 hover:bg-sky-950 text-white px-4 py-2 rounded">
    {editPublikasi ? "Simpan Perubahan" : "Simpan"}
  </button>

  {editPublikasi && (
    <button 
      type="button"
      onClick={() => {
        setEditPublikasi(null);
        setTitle("");
        setThumbnail(null);
        setThumbnailPreview(null);
        setMedia(null);
        setMediaPreview(null);
      }} 
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Batal Edit
    </button>
  )}
</div>

      </form>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-center shadow-lg rounded-lg text-sm md:text-base">
          <thead>
            <tr className="bg-sky-800 text-white">
              <th className="border p-2">Judul</th>
              <th className="border p-2">Thumbnail</th>
              <th className="border p-2">Media</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {publikasiList.map((publikasi) => (
              <tr key={publikasi.id} className="text-center">
                <td className="border p-2">{publikasi.title}</td>
                <td className="border p-2">
                  {publikasi.thumbnail && <img src={publikasi.thumbnail} alt="Thumbnail" className="h-12 w-12 object-cover mx-auto rounded-lg" />}
                </td>
                <td className="border p-2">
                  {publikasi.media ? <a href={publikasi.media} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lihat Media</a> : "-"}
                </td>
                <td className="border p-2">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
                    <button 
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      onClick={() => navigate(`/publikasi/${publikasi.id}`)}
                    >
                      Lihat
                    </button>
                    <button 
                      onClick={() => {
                        console.log("Edit data:", publikasi); // 🟢 Debugging
                        setEditPublikasi(publikasi);
                      }} 
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  <button onClick={() => handleDelete(publikasi.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Publikasi;
