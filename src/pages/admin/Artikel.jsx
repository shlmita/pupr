import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { uploadArtikel } from "../../supabase/uploadArtikel";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


const Artikel = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [gambarArtikel, setGambarArtikel] = useState([]);
    const [artikelList, setArtikelList] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchArtikel();
    }, []);

    const fetchArtikel = async () => {
        let { data, error } = await supabase.from("artikel").select("*");
        if (error) {
            console.error("Error fetching articles:", error);
        } else {
            console.log("Data artikel setelah update:", data);
            setArtikelList(data);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Periksa apakah nilai judul dan isi valid
        console.log('judul:', judul);
        console.log('isi:', isi);
    
        if (editingId) {
            let updatedFields = { judul, isi };

            if (thumbnail && typeof thumbnail !== "string") {
                const uniqueThumbnailName = `thumbnails/${uuidv4()}_${thumbnail.name}`;
                const { data, error } = await supabase.storage.from("media").upload(uniqueThumbnailName, thumbnail);
                if (error) {
                    console.error("Error upload thumbnail:", error.message);
                } else {
                    const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(uniqueThumbnailName);
                    updatedFields.thumbnail = publicUrlData.publicUrl;
                }
            }

            let gambarUrls = ["", "", ""];
            let posisiGambar = ["", "", ""];

            for (let i = 0; i < gambarArtikel.length && i < 3; i++) {
                const file = gambarArtikel[i]?.file;
                const posisi = gambarArtikel[i]?.posisi;
                if (!file) {
                    gambarUrls[i] = gambarArtikel[i].url;
                    posisiGambar[i] = posisi || "";
                    continue;
                }
            
                const uniqueFileName = `artikel/${uuidv4()}_${file.name}`;
                const { data, error } = await supabase.storage.from("media").upload(uniqueFileName, file);

                if (error) {
                    console.error(`Error upload gambar ke-${i + 1}:`, error.message);
                } else {
                    const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(uniqueFileName);
                    gambarUrls[i] = publicUrlData.publicUrl;
                    posisiGambar[i] = posisi || "";
                }
            }

            updatedFields.gambar1 = gambarUrls[0];
            updatedFields.posisi_gambar1 = posisiGambar[0];
            updatedFields.gambar2 = gambarUrls[1];
            updatedFields.posisi_gambar2 = posisiGambar[1];
            updatedFields.gambar3 = gambarUrls[2];
            updatedFields.posisi_gambar3 = posisiGambar[2];

            const { error } = await supabase.from("artikel").update(updatedFields).eq("id", editingId);
            if (error) {
                alert("Gagal mengedit artikel: " + error.message);
                console.error(error);
            } else {
                alert("Artikel berhasil diperbarui!");
                setEditingId(null);
                setJudul("");
                setIsi("");
                setThumbnail(null);
                setGambarArtikel([]);
                fetchArtikel(); 
                window.location.reload();  
            }
            
            if (error) {
                alert("Gagal mengedit artikel: " + error.message);
                console.error(error);
            } else {
                alert("Artikel berhasil diperbarui!");
                setEditingId(null);
                setJudul("");
                setIsi("");
                fetchArtikel(); // Mengambil data artikel setelah update
                window.location.reload();  // Menyegarkan halaman setelah sukses update
            }
        } else {
            const result = await uploadArtikel({
                judul,
                isi,
                thumbnailFile: thumbnail,
                gambarArtikel,
            });
            if (result.success) {
                alert("Artikel berhasil diunggah!");
                fetchArtikel(); // Memperbarui artikel setelah berhasil upload
                window.location.reload(); // Menyegarkan halaman setelah berhasil upload
            } else {
                alert("Gagal mengunggah artikel: " + result.error);
            }
        }
    };
    
    
    const handleDelete = async (id) => {
        const { error } = await supabase.from("artikel").delete().eq("id", id);
        if (error) {
            console.error("Error deleting article:", error);
            alert("Gagal menghapus artikel");
        } else {
            alert("Artikel berhasil dihapus");
            fetchArtikel(); // Memperbarui artikel tanpa me-refresh halaman
            window.location.reload();  // Menyegarkan halaman setelah berhasil delete
        }
    };
    
    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        setGambarArtikel(prevImages => [
            ...prevImages.filter(img => img.url), // Simpan gambar lama
            ...files.map(file => ({ file, posisi: "default" }))
        ]);
        
    };
    
    const handleEdit = (artikel) => {
        setEditingId(artikel.id);
        setJudul(artikel.judul);
        setIsi(artikel.isi);
        setThumbnail(artikel.thumbnail);
        setGambarArtikel([
            artikel.gambar1 ? { url: artikel.gambar1, file: null, posisi: artikel.posisi_gambar1 || "default" } : null,
            artikel.gambar2 ? { url: artikel.gambar2, file: null, posisi: artikel.posisi_gambar2 || "default" } : null,
            artikel.gambar3 ? { url: artikel.gambar3, file: null, posisi: artikel.posisi_gambar3 || "default" } : null,
        ].filter(Boolean));
    };

    const handleRemoveThumbnail = () => {
        setThumbnail(null);
    };
    
    const handleRemoveImage = (index) => {
        setGambarArtikel(prevImages => prevImages.filter((_, i) => i !== index));
    };
    
    
    return (
        <div className="px-3">
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Kelola Artikel</h1>
            <form className="mb-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-semibold mb-1">Judul Artikel</label>
                    <input className="border p-2 w-full rounded" type="text" placeholder="Masukkan judul" value={judul} onChange={(e) => setJudul(e.target.value)} required />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Isi Artikel</label>
                    <textarea className="border p-2 w-full rounded" placeholder="Masukkan isi artikel" value={isi} onChange={(e) => setIsi(e.target.value)} required></textarea>
                </div>
                <div>
                    <label className="block font-semibold mb-1">Thumbnail Artikel</label>
                    <input className="border p-2 w-full rounded" type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
                    {thumbnail && (
                        <div className="flex items-center gap-2">
                            <img src={typeof thumbnail === "string" ? thumbnail : URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-20 h-20 object-cover rounded my-2" />
                            <button
                                type="button"
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                onClick={handleRemoveThumbnail}
                            >
                                Hapus Thumbnail
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Gambar dalam Artikel</label>
                    <input className="border p-2 w-full rounded" type="file" multiple onChange={handleAddImage} />

                    {gambarArtikel.length > 0 && (
                        <div className="mt-2">
                            {gambarArtikel.map((img, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <img src={img.url || URL.createObjectURL(img.file)} alt={`Gambar ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                                    <select
                                        className="border p-2 rounded"
                                        value={img.posisi}
                                        onChange={(e) => {
                                            const updatedImages = [...gambarArtikel];
                                            updatedImages[index].posisi = e.target.value;
                                            setGambarArtikel(updatedImages);
                                        }}
                                    >
                                        <option value="default">Posisi Gambar</option>
                                        <option value="atas">Atas</option>
                                        <option value="bawah">Bawah</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tombol Simpan Edit atau Unggah Artikel */}
                <button
                    type="submit"
                    className="bg-sky-900 text-white px-4 py-2 rounded w-full hover:bg-sky-800 mt-2"
                >
                    {editingId ? "Perbarui Artikel" : "Unggah Artikel"}
                </button>

                {/* Tombol Batal Edit */}
                {editingId && (
                    <button
                        onClick={() => {
                            setEditingId(null);
                            setJudul("");
                            setIsi("");
                            setThumbnail(null);
                            setGambarArtikel([]);
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded w-full hover:bg-gray-600 mt-2"
                    >
                        Batal Edit
                    </button>
                )}
            </form>

            <h2 className="text-xl font-semibold mb-3">Daftar Artikel</h2>
            <table className="w-full border-collapse border border-gray-300 text-left shadow-lg rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-sky-900 text-white">
                        <th className="p-3 border">Judul</th>
                        <th className="p-3 border">Isi Artikel</th>
                        <th className="p-3 border">Thumbnail</th>
                        <th className="p-3 border">Gambar</th>
                        <th className="p-3 border">Aksi</th>
                    </tr>
                </thead>
                <tbody className="border-none">
                    {artikelList.map((artikel) => (
                        <tr key={artikel.id} className="border">
                            <td className="p-3 border uppercase">{artikel.judul}</td>
                            <td className="p-3 border">{artikel.isi.length > 90 ? artikel.isi.slice(0, 90) + '...' : artikel.isi}</td>
                            <td className="p-3 border text-center">
                                {artikel.thumbnail && <img src={artikel.thumbnail} alt="Thumbnail" className="w-20 h-20 object-cover mx-auto rounded" />}
                            </td>
                            <td className="p-3 border text-center">
                                <div className="flex justify-center gap-2 flex-wrap">
                                    {artikel.gambar1 && <img src={artikel.gambar1} alt="Gambar 1" className="w-20 h-20 object-cover rounded" />}
                                    {artikel.gambar2 && <img src={artikel.gambar2} alt="Gambar 2" className="w-20 h-20 object-cover rounded" />}
                                    {artikel.gambar3 && <img src={artikel.gambar3} alt="Gambar 3" className="w-20 h-20 object-cover rounded" />}
                                </div>
                            </td>
                            <td className="p-3 border text-center">
                                <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 items-center">
                                    <Link to={`/artikel/${artikel.id}`} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 w-full text-center">Lihat</Link>
                                    <button onClick={() => handleEdit(artikel)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 w-full">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(artikel.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 w-full">Hapus</button>
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

export default Artikel;
