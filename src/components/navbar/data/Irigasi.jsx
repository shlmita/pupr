import { useNavigate } from "react-router-dom";

const pdfList = [
    {
      slug: "Data-Mata-Air-Kabupaten-Grobogan",
      title: "DATA MATA AIR KABUPATEN GROBOGAN",
      date: "2/20/2025",
      thumbnail: "/irigasi-1.png",
      file: "/public/data_mata_air_kab_grob.pdf"
    },
    {
      slug: "Penetapan-Status-Daerah-Irigasi",
      title: "PENETAPAN STATUS DAERAH IRIGASI",
      date: "2/20/2025",
      thumbnail: "/irigasi-2.png",
      file: "/public/penetapan_status_daerah_irigasi_tanggung_2016.pdf"
    }
];
  

const Irigasi = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0),0_10px_30px_rgba(0,0,0,0.3)]">
      {/* Heading */}
      <div className="text-center mb-6 md:mb-10">
        <h1 className="p-5 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2">
          Data Irigasi dan Air Baku
        </h1>
        <p className="-mt-5 text-center text-sm sm:text-base">Daftar Data Irigasi dan Air Baku</p>
      </div>

      {/* Grid PDF Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {pdfList.map((pdf) => (
          <div
            key={pdf.id}
            className="flex flex-col bg-sky-950 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all"
            onClick={() => navigate(`/irigasi-dan-air-baku/${pdf.slug}`)}
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

export default Irigasi;
