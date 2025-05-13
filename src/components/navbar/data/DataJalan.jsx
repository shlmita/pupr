import { useNavigate } from "react-router-dom";

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

const DataJalan = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0),0_10px_30px_rgba(0,0,0,0.3)]">
      {/* Heading */}
      <div className="text-center mb-6 md:mb-10">
        <h1 className="p-5 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2">
          Data Jalan
        </h1>
        <p className="-mt-5 text-center text-sm sm:text-base">Daftar Data Jalan</p>
      </div>

      {/* Grid PDF Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {pdfList.map((pdf, index) => (
          <div
            key={index}
            className="flex flex-col bg-sky-950 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all"
            onClick={() => navigate(`/data-jalan/${pdf.slug}`)}
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

export default DataJalan;
