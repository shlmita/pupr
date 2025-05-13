import { useNavigate } from "react-router-dom";

const pdfList = [
  {
    slug: "Daftar-Aset-Kondisi-Tidak-Ditemukan",
    title: "Daftar Aset kondisi Tidak Ditemukan",
    date: "2/20/2025",
    thumbnail: "/public/aset-1.png",
    file: "/public/Daftar_Aset_kondisi_Tidak_Ditemukan.pdf"
  },
  {
    slug: "Daftar-Aset Kondisi-Kurang-Baik",
    title: "Daftar Aset Kondisi Kurang Baik",
    date: "2/20/2025",
    thumbnail: "/public/aset-2.png",
    file: "/public/Daftar_Aset_kondisi_Kurang_Baik.pdf"
  },
  {
    slug: "Daftar-Aset-Kondisi-Rusak-Berat",
    title: "Daftar Aset kondisi Rusak Berat",
    date: "2/20/2025",
    thumbnail: "/public/aset-3.png",
    file: "/public/Daftar_Aset_kondisi_Rusak_Berat.pdf"
  },
  {
    slug: "Daftar-Aset-Kondisi-Baik",
    title: "Daftar Aset Kondisi Baik",
    date: "2/20/2025",
    thumbnail: "/public/aset-4.png",
    file: "/public/Daftar_Aset_Kondisi_Baik.pdf"
  },
  {
    slug: "33-PNS-yang-Ditugaskan-jadi-Sekdes-Ditarik-Lagi-ke-SKPD",
    title: "33 PNS Ditugaskan jadi Sekdes Ditarik Lagi ke SKPD",
    date: "2/20/2025",
    thumbnail: "/public/aset-5.png",
    file: "/public/33 PNS yang Ditugaskan jadi Sekdes Ditarik Lagi ke SKPD - Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Grobogan.pdf"
  },
  {
    slug: "Aset-Tanah-Dinas-Bina-Marga-Kabupaten-Grobogan",
    title: "Aset Tanah Dinas Bina Marga",
    date: "2/20/2025",
    thumbnail: "/public/aset-6.png",
    file: "/public/Aset_Tanah_Dinas_Bina_Marga_Kabupaten_Grobogan.pdf"
  },
];

const truncate = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const AsetDinas = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0),0_10px_30px_rgba(0,0,0,0.3)]">
      {/* Heading */}
      <div className="text-center mb-6 md:mb-10">
        <h1 className="p-5 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2"> 
          Aset Dinas
        </h1>
        <p className="-mt-5 text-center text-sm sm:text-base">Daftar Aset Dinas</p>
      </div>

      {/* Grid PDF Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {pdfList.map((pdf, index) => (
          <div
            key={index}
            className="flex flex-col bg-sky-950 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all"
            onClick={() => navigate(`/aset-dinas/${pdf.slug}`)}
          >
            <div className="relative overflow-hidden group">
              <img
                src={pdf.thumbnail}
                alt="Thumbnail"
                className="w-full h-40 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">Lihat Detail</span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-base md:text-lg font-semibold">
                  {truncate(pdf.title, 35)}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsetDinas;
