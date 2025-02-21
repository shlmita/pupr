import { useState } from "react";
import uploadBPK from "../../supabase/uploadBPK"; // Sesuaikan path

const BpkForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    bagian: "",
    tanggal_pelaksanaan: "",
    dana: "",
    penanggung_jawab: "",
    pengawas1: "",
    pengawas2: "",
    pengawas3: "",
  });

  // Opsi untuk dropdown
  const bagianOptions = ["Keuangan", "SDM", "Operasional", "IT", "Pemasaran"];
  const penanggungJawabOptions = ["Budi Santoso", "Dewi Lestari", "Siti Aminah", "Joko Widodo"];
  const pengawasOptions = ["Agus Salim", "Rina Kusuma", "Hendri Setiawan", "Linda Hartati"];

  // Fungsi menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadBPK(formData);
    alert("Data berhasil dikirim!");
    setFormData({
      nama: "",
      bagian: "",
      tanggal_pelaksanaan: "",
      dana: "",
      penanggung_jawab: "",
      pengawas1: "",
      pengawas2: "",
      pengawas3: "",
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Form BPK</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Nama */}
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={formData.nama}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />

        {/* Bagian Dropdown */}
        <select
          name="bagian"
          value={formData.bagian}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>Pilih Bagian</option>
          {bagianOptions.map((bagian, idx) => (
            <option key={idx} value={bagian}>{bagian}</option>
          ))}
        </select>

        {/* Tanggal Pelaksanaan */}
        <input
          type="date"
          name="tanggal_pelaksanaan"
          value={formData.tanggal_pelaksanaan}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />

        {/* Dana */}
        <input
          type="number"
          name="dana"
          placeholder="Dana (Rp)"
          value={formData.dana}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />

        {/* Penanggung Jawab Dropdown */}
        <select
          name="penanggung_jawab"
          value={formData.penanggung_jawab}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>Pilih Penanggung Jawab</option>
          {penanggungJawabOptions.map((nama, idx) => (
            <option key={idx} value={nama}>{nama}</option>
          ))}
        </select>

        {/* Pengawas 1 */}
        <select
          name="pengawas1"
          value={formData.pengawas1}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>Pilih Pengawas 1</option>
          {pengawasOptions.map((nama, idx) => (
            <option key={idx} value={nama}>{nama}</option>
          ))}
        </select>

        {/* Pengawas 2 */}
        <select
          name="pengawas2"
          value={formData.pengawas2}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>Pilih Pengawas 2</option>
          {pengawasOptions.map((nama, idx) => (
            <option key={idx} value={nama}>{nama}</option>
          ))}
        </select>

        {/* Pengawas 3 */}
        <select
          name="pengawas3"
          value={formData.pengawas3}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>Pilih Pengawas 3</option>
          {pengawasOptions.map((nama, idx) => (
            <option key={idx} value={nama}>{nama}</option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Simpan Data
        </button>
      </form>
    </div>
  );
};

export default BpkForm;
