import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const pdfList = [
  {
    slug: "Data-Kondisi-Jalan-2020",
    title: "DATA KONDISI JALAN 2020",
    date: "2/20/2025",
    thumbnail: "/public/jalan-1.png",
    file: "/public/kondisi_jalan_2020.pdf"
  },
  {
    slug: "Panjang-Jalan-Kabupaten-Grobogan-Kondisi-Tahun-2018",
    title: "DATA KONDISI JALAN 2018",
    date: "2/20/2025",
    thumbnail: "/public/jalan-2.png",
    file: "/public/KONDISI_JALAN_2018.pdf"
  },
  {
    slug: "Penetapan-Ruas-Jalan-Tahun-2018",
    title: "PENETEPAN RUAS JALAN TAHUN 2018",
    date: "2/20/2025",
    thumbnail: "/public/jalan-3.png",
    file: "/public/Lampiran_Jalan_Final_fix.pdf"
  },
  {
    slug: "Panjang-Jalan-Kabupaten-Grobogan-Kondisi-Tahun-2013",
    title: "DATA KONDISI JALAN 2013",
    date: "2/20/2025",
    thumbnail: "/public/jalan-4.png",
    file: "/public/Panjang_Jalan_Kabupaten_Grobogan_Menurut_Kondisi_Jalan_Tahun_2013.pdf"
  },
  {
    slug: "Penentuan-Ruas-Jalan-Kabupaten-di-Kabupaten-Grobogan",
    title: "Penentuan Ruas Jalan",
    date: "2/20/2025",
    thumbnail: "/public/jalan-5.png",
    file: "/public/Penentuan_Ruas_Jalan_Kabupaten_di_Kabupaten_Grobogan.pdf"
  },
  {
    slug: "Panjang-Jalan-Kabupaten-Grobogan-Kondisi-Tahun-2014",
    title: "DATA KONDISI JALAN 2014",
    date: "2/20/2025",
    thumbnail: "/public/jalan-6.png",
    file: "/public/Panjang_Jalan_Kabupaten_Grobogan_Menurut_Kondisi_Jalan_Tahun_2014.pdf"
  },
];

const DataJalanDetail = () => {
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

export default DataJalanDetail;