import { useState } from "react";
import { tambahBukuTamu } from "../../supabase/uploadBukuTamu";

const BukuTamu = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await tambahBukuTamu(nama, email, pesan);

    if (error) {
      setMessage({ type: "error", text: "Gagal mengirim pesan." });
    } else {
      setMessage({ type: "success", text: "Pesan berhasil dikirim!" });
      setNama("");
      setEmail("");
      setPesan("");
    }
    setLoading(false);
  };

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-80 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_30px_rgba(0,0,0,0.3),0_10px_30px_rgba(0,0,0,0.3)]">
      <h2 className="text-xl font-bold text-gray-700 text-center mb-4">Buku Tamu</h2>
      {message && (
        <p className={`text-sm text-center mb-4 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
          {message.text}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-bold text-gray-700">Nama</label>
        <input
          type="text"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <label className="block font-bold text-gray-700">Email</label>
        <input
          type="email"
          placeholder="xxxxxx@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        <label className="block font-bold text-gray-700">Pesan</label>
        <textarea
          placeholder="Pesan"
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-900 text-white py-2 rounded-md hover:bg-sky-950 transition"
        >
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </button>
      </form>
    </div>
  );
};

export default BukuTamu;
