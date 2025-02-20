import { useEffect, useState } from "react";
import { ambilBukuTamu, hapusBukuTamu, editBukuTamu } from "../../supabase/uploadBukuTamu";

const BukuTamu = () => {
  const [dataTamu, setDataTamu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [selectedTamu, setSelectedTamu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await ambilBukuTamu();
      if (!error) setDataTamu(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await hapusBukuTamu(id);
    setDataTamu(dataTamu.filter((tamu) => tamu.id !== id));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await editBukuTamu(selectedTamu.id, selectedTamu.nama, selectedTamu.email, selectedTamu.pesan);
    setDataTamu(dataTamu.map((tamu) => (tamu.id === selectedTamu.id ? selectedTamu : tamu)));
    setEditModal(false);
  };

  if (loading) return <p className="text-center text-gray-500">Memuat data...</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Admin Buku Tamu</h2>

      {/* Tabel Responsif */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 p-3">Nama</th>
              <th className="border border-gray-300 p-3">Email</th>
              <th className="border border-gray-300 p-3">Pesan</th>
              <th className="border border-gray-300 p-3">Tanggal</th>
              <th className="border border-gray-300 p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataTamu.map((tamu) => (
              <tr key={tamu.id} className="text-center">
                <td className="border border-gray-300 p-3">{tamu.nama}</td>
                <td className="border border-gray-300 p-3">{tamu.email}</td>
                <td className="border border-gray-300 p-3">{tamu.pesan}</td>
                <td className="border border-gray-300 p-3">
                  {new Date(tamu.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="border border-gray-300 p-3 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedTamu(tamu);
                      setEditModal(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm md:text-base"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tamu.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm md:text-base"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {dataTamu.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 p-4">
                  Tidak ada data buku tamu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Edit (Responsif) */}
      {editModal && selectedTamu && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Edit Buku Tamu</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <input
                type="text"
                value={selectedTamu.nama}
                onChange={(e) => setSelectedTamu({ ...selectedTamu, nama: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Nama"
              />
              <input
                type="email"
                value={selectedTamu.email}
                onChange={(e) => setSelectedTamu({ ...selectedTamu, email: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email"
              />
              <textarea
                value={selectedTamu.pesan}
                onChange={(e) => setSelectedTamu({ ...selectedTamu, pesan: e.target.value })}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Pesan"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BukuTamu;
