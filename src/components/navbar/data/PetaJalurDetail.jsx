import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const pdfList = [
  {
    slug: "Peta-Jalur-Alternatif-di-Grobogan",
    title: "Peta Jalur Alternatif di Grobogan",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/peta-6.png",
    file: "/public/peta/peta_jalur_alternatif.pdf"
  },
  {
    slug: "Jalur-Alternatif-Penawangan-Truko-Jeketro",
    title: "Jalur Alternatif Penawangan-Truko-Jeketro",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/peta-7.png",
    file: "/public/peta/penawangan_truko_jeketro.pdf"
  },
  {
    slug: "Jalur-Alternatif-Wirosari-Tegalrejo-Batas-Blora",
    title: "Jalur Alternatif Wirosari-Tegalrejo-Batas Blora",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/peta-8.png",
    file: "/public/peta/wirosari_tegalrejo_bts blora.pdf"
  },
  {
    slug: "Jalur-Alternatif-Jalan-Lingkar-Utara",
    title: "Jalur Alternatif Jalan Lingkar Utara",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/peta-9.png",
    file: "/public/peta/jalan_lingkar utara.pdf"
  },
  {
    slug: "Jalur-Alternatif-Grobogan-Putatsari-Rejosari",
    title: "Jalur Alternatif Grobogan-Putatsari-Rejosari",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/peta-10.png",
    file: "/public/peta/grob_putatsari_rejosari.pdf"
  },
  {
    slug: "Jalur-Alternatif-Danyang-Kalongan-Kandangan-Gatak-Pulokulon-Tuko-Banjarsari",
    title: "Jalur Alternatif Danyang-Kalongan-Kandangan-Gatak-Pulokulon-Tuko-Banjarsari",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/peta-11.png",
    file: "/public/peta/danyang_banjarsari_ngaringan.pdf"
  },
  {
    slug: "Jalur-Alternatif-Danyang-Pengkol-Penawangan-Godong-Klambu",
    title: "Jalur Alternatif Danyang-Pengkol-Penawangan-Godong-Klambu",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/peta-12.png",
    file: "/public/peta/danyang_pengkol_penawangan_godong_klambu.pdf"
  },
];

const PetaJalurDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const selected = pdfList.find((item) => item.slug === slug);
    setData(selected);
  }, [slug]);

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  };

  if (!data) return <p className="text-center text-gray-500 mt-40">Data tidak ditemukan</p>;

  return (
    <div className="mt-28 mb-20 mx-5 my-5 lg:mt-32 lg:mb-10 lg:mx-44 lg:my-36 rounded-2xl flex items-center justify-center min-h-auto bg-sky-800 hover:bg-sky-900 shadow-2xl">
      <div className="relative m-7 w-auto lg:w-full lg:max-w-4xl p-6 bg-white rounded-2xl shadow-xl">
        {/* Background dekoratif */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-blue-100 shadow-lg"></div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="mb-4 text-blue-600 hover:underline"
            >
              ← Kembali
            </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            {data.title}
          </h1>
          <a
            href={data.file}
            download
            className="px-5 py-2 text-sm md:text-base font-medium text-white bg-sky-800 rounded-lg hover:bg-sky-950 transition-all duration-300"
          >
            Unduh PDF
          </a>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Diupload pada: {formatDate(data.date)}
        </p>

        {/* PDF Embed */}
        <embed
          src={data.file}
          type="application/pdf"
          className="w-full h-[70vh] rounded-lg border-2 border-gray-300"
        />
      </div>
    </div>
  );
};

export default PetaJalurDetail;