import { useNavigate } from "react-router-dom";

const pdfList = [
  {
    slug: "Daftar-Embung-DPUPR",
    title: "Daftar Embung DPUPR",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/embung-1.png",
    file: "/public/sungaiembung/embungdpupr.pdf"
  },
  {
    slug: "Inventarisasi-Bendung",
    title: "INVENTARISASI BENDUNG",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/embung-2.png",
    file: "/public/sungaiembung/inventarisasi_bendung.pdf"
  },
  {
    slug: "Inventarisasi-Embung",
    title: "INVENTARISASI EMBUNG",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/embung-3.png",
    file: "/public/sungaiembung/inventarisasi_embung_2020.pdf"
  },
  {
    slug: "Data-Dasar-Prasarana-Irigasi",
    title: "DATA DASAR PRASARANA IRIGASI KAB. GROBOGAN (DD3)",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/embung-4.png",
    file: "/public/sungaiembung/dd3.pdf"
  },
  {
    slug: "Daftar-Inventarisasi-Embung",
    title: "DAFTAR INVENTARISASI EMBUNG",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/embung-5.png",
    file: "/public/sungaiembung/inventarisasi_embung_2020.pdf"
  },
  {
    slug: "Daftar-Inventarisasi-Bendung-Tahun-2018",
    title: "DAFTAR INVENTARISASI BENDUNG TAHUN 2018",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/embung-6.png",
    file: "/public/sungaiembung/daftar_inventaris_bendung_2018.pdf"
  },
  {
    slug: "Kriteria-dan-Penetapan-Wilayah-Sungai",
    title: "KRITERIA DAN PENETAPAN WILAYAH SUNGAI",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/embung-7.png",
    file: "/public/sungaiembung/KRITERIA_DAN_PENETAPAN_WILAYAH_SUNGAI.pdf"
  },
];

const truncate = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const SungaiEmbung = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0),0_10px_30px_rgba(0,0,0,0.3)]">
      {/* Heading */}
      <div className="text-center mb-6 md:mb-10">
        <h1 className="p-5 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2"> 
          Data Sungai dan Embung
        </h1>
        <p className="-mt-5 text-center text-sm sm:text-base">Daftar Data Sungai dan Embung</p>
      </div>

      {/* Grid PDF Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {pdfList.map((pdf, index) => (
          <div
            key={index}
            className="flex flex-col bg-sky-950 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all"
            onClick={() => navigate(`/sungai-dan-embung/${pdf.slug}`)}
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

export default SungaiEmbung;
