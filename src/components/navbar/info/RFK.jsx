import { useNavigate } from "react-router-dom";

const pdfList = [
  {
    slug: "RFK-Agustus-2022",
    title: "Realisasi Fisik Kegiatan Agustus 2022",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/RFK-1.png",
    file: "/public/rfk/agustus2022.pdf"
  },
  {
    slug: "RFK-Desember-2021",
    title: "Realisasi Fisik Kegiatan Desember 2021",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/RFK-2.png",
    file: "/public/rfk/des2021.pdf"
  },
  {
    slug: "RFK-Januari-2021",
    title: "Realisasi Fisik Kegiatan Januari 2021",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/RFK-5.png",
    file: "/public/rfk/RFK_Januari_2021.pdf"
  },
  {
    slug: "RFK-Agustus-2020",
    title: "Realisasi Fisik Kegiatan Agustus 2020",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/RFK-3.png",
    file: "/public/rfk/rfk_agustus_2020.pdf"
  },
  {
    slug: "RFK-Desember-2020",
    title: "Realisasi Fisik Kegiatan Desember 2020",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/RFK-4.png",
    file: "/public/rfk/rfk_des_2020.pdf"
  },
  {
    slug: "RFK-Juli-2020",
    title: "Realisasi Fisik Kegiatan Juli 2020",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/RFK-6.png",
    file: "/public/rfk/rfk_juli_2020.pdf"
  },
  {
    slug: "RFK-November-2020",
    title: "Realisasi Fisik Kegiatan November 2020",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/RFK-7.png",
    file: "/public/rfk/rfk_nov_2020.pdf"
  },
  {
    slug: "RFK-Oktober-2020",
    title: "Realisasi Fisik Kegiatan Oktober 2020",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/RFK-8.png",
    file: "/public/rfk/rfk_okt_2020.pdf"
  },
  {
    slug: "RFK-September-2020",
    title: "Realisasi Fisik Kegiatan September 2020",
    date: "2/20/2025",
    thumbnail: "/public/pdf-thumbnails/RFK-9.png",
    file: "/public/rfk/rfk_sep_2020.pdf"
  },
];

const RFK = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0),0_10px_30px_rgba(0,0,0,0.3)]">
      {/* Heading */}
      <div className="text-center mb-6 md:mb-10">
        <h1 className="p-5 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2">
          RFK
        </h1>
        <p className="-mt-5 text-center text-sm sm:text-base">Daftar RFK (Realisasi Fisik Kegiatan)</p>
      </div>

      {/* Grid PDF Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {pdfList.map((pdf, index) => (
          <div
            key={index}
            className="flex flex-col bg-sky-950 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all"
            onClick={() => navigate(`/rfk/${pdf.slug}`)}
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
                  {pdf.title}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RFK;
