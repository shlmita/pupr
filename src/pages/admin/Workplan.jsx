import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

const Workplan = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [workplans, setWorkplans] = useState([]);
  const [editWorkplan, setEditWorkplan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkplans();
  }, []);

  const fetchWorkplans = async () => {
    const { data, error } = await supabase.from("rencana_kerja").select("id, title, thumbnail, media");
    if (error) {
      console.error("Error mengambil data:", error.message);
      return;
    }
    setWorkplans(data);
  };

  const handleEditClick = (workplan) => {
    setEditWorkplan(workplan);
    setTitle(workplan.title);
    setThumbnailPreview(supabase.storage.from("media-uploads").getPublicUrl(workplan.thumbnail).data.publicUrl);
    setMediaPreview(supabase.storage.from("media-uploads").getPublicUrl(workplan.media).data.publicUrl);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!media || !media.type.includes("pdf")) {
      alert("Media harus berupa file PDF");
      return;
    }
    if (!thumbnail) {
      alert("Thumbnail tidak boleh kosong");
      return;
    }

    const imgPath = `images/${Date.now()}_${thumbnail.name}`;
    const pdfPath = `pdfs/${Date.now()}_${media.name}`;

    const { data: imgData, error: imgError } = await supabase.storage.from("media-uploads").upload(imgPath, thumbnail);
    const { data: pdfData, error: pdfError } = await supabase.storage.from("media-uploads").upload(pdfPath, media);

    if (imgError || pdfError) {
      alert("Gagal mengunggah file");
      console.error(imgError, pdfError);
      return;
    }

    const { error } = await supabase.from("rencana_kerja").insert([
      {
        title,
        thumbnail: imgData?.path,
        media: pdfData?.path,
        created_at: new Date(),
      },
    ]);

    if (!error) {
      alert("Berhasil menyimpan data");
      setTitle("");
      setThumbnail(null);
      setThumbnailPreview(null);
      setMedia(null);
      setMediaPreview(null);
      fetchWorkplans();
    } else {
      alert("Gagal menyimpan ke database");
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editWorkplan) return;

    let imgPath = editWorkplan.thumbnail;
    let pdfPath = editWorkplan.media;

    if (thumbnail) {
      const newImgPath = `images/${Date.now()}_${thumbnail.name}`;
      const { data: imgData, error: imgError } = await supabase.storage.from("media-uploads").upload(newImgPath, thumbnail);
      if (imgError) {
        alert("Gagal mengunggah thumbnail");
        console.error(imgError);
        return;
      }
      imgPath = imgData?.path;
    }

    if (media) {
      const newPdfPath = `pdfs/${Date.now()}_${media.name}`;
      const { data: pdfData, error: pdfError } = await supabase.storage.from("media-uploads").upload(newPdfPath, media);
      if (pdfError) {
        alert("Gagal mengunggah media PDF");
        console.error(pdfError);
        return;
      }
      pdfPath = pdfData?.path;
    }

    const { error } = await supabase
      .from("rencana_kerja")
      .update({ title, thumbnail: imgPath, media: pdfPath })
      .eq("id", editWorkplan.id);

    if (!error) {
      alert("Berhasil memperbarui data!");
      setEditWorkplan(null);
      setTitle("");
      setThumbnail(null);
      setThumbnailPreview(null);
      setMedia(null);
      setMediaPreview(null);
      fetchWorkplans();
    } else {
      alert("Gagal memperbarui data");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("rencana_kerja").delete().eq("id", id);
    if (!error) {
      alert("Berhasil menghapus data");
      fetchWorkplans();
    } else {
      alert("Gagal menghapus data");
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Kelola Rencana Kerja</h2>
      <form onSubmit={editWorkplan ? handleUpdate : handleUpload} className="mb-6 space-y-4">
        <label className="block font-bold text-gray-700">Judul Berita</label>
        <input 
          type="text" 
          placeholder="Judul" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full p-2 border rounded" 
          required 
        />

        <label className="block font-bold text-gray-700">Upload Gambar Thumbnail</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            setThumbnail(e.target.files[0]);
            setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
          }} 
          className="w-full p-2 border rounded" 
        />
        {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail Preview" className="h-16 mt-2" />}

        <label className="block font-bold text-gray-700">Upload Media</label>
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={(e) => {
            setMedia(e.target.files[0]);
            setMediaPreview(URL.createObjectURL(e.target.files[0]));
          }} 
          className="w-full p-2 border rounded" 
        />
        {mediaPreview && (
          <p className="mt-2">
            <a href={mediaPreview} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lihat PDF</a>
          </p>
        )}

        <button type="submit" className="bg-sky-900 hover:bg-sky-950 text-white px-4 py-2 rounded">
          {editWorkplan ? "Simpan Perubahan" : "Simpan"}
        </button>
        {editWorkplan && (
          <button 
            type="button" 
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2" 
            onClick={() => {
              setEditWorkplan(null);
              setTitle("");
              setThumbnail(null);
              setThumbnailPreview(null);
              setMedia(null);
              setMediaPreview(null);
            }}
          >
            Batal
          </button>
        )}
      </form>

      <div className="p-4 max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-x-auto">
  <h2 className="text-xl font-bold mb-4">Kelola Rencana Kerja</h2>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300 text-center shadow-lg rounded-lg">
      <thead>
        <tr className="bg-sky-800 text-white">
          <th className="border p-2">Judul</th>
          <th className="border p-2">Thumbnail</th>
          <th className="border p-2">Media</th>
          <th className="border p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {workplans.map((wp) => (
          <tr key={wp.id} className="text-center">
            <td className="border p-2">{wp.title}</td>
            <td className="border p-2">
              <img 
                src={supabase.storage.from("media-uploads").getPublicUrl(wp.thumbnail).data.publicUrl} 
                alt="Thumbnail" 
                className="h-12 w-12 object-cover mx-auto rounded-lg"
              />
            </td>
            <td className="border p-2">
              <a 
                href={supabase.storage.from("media-uploads").getPublicUrl(wp.media).data.publicUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 underline"
              >
                Lihat PDF
              </a>
            </td>
            <td className="border p-2">
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => navigate(`/workplan/${wp.id}`)}
                >
                  Lihat
                </button>
                <button 
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 transition"
                  onClick={() => handleEditClick(wp)}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={() => handleDelete(wp.id)}
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};

export default Workplan;
