import { Info, CloudRain, Book } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FadeInSection from "../../FadeInSection";

const DaftarInformasi = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const services = [
    {
      id: 1,
      title: "Daftar Informasi Publik",
      icon: <Info />,
      link: "/ppid/daftar-informasi-publik"
    },
    {
      id: 2,
      title: "Informasi Serta Merta",
      icon: <CloudRain />,
      link: "/ppid/informasi-serta-merta"
    },
    {
      id: 3,
      title: "Informasi Setiap Saat",
      icon: <Book />,
      link: "/ppid/informasi-berkala"
    }
  ];

  return (
    <div className="relative mt-32 mb-16 p-6 m-7 lg:mx-44 max-w-4xl bg-white shadow-lg rounded-lg shadow-[0_-10px_20px_rgba(0,0,0,0),0_10px_30px_rgba(0,0,0,0.3)]">
      <FadeInSection>
        <h1 className="text-center lg:text-5xl text-3xl font-medium mb-4">Daftar Informasi</h1>
        <p className="text-center">
          Jenis-Jenis Informasi yang Tersedia
        </p>
      </FadeInSection>

      <div className="services-box pt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-center">
        {services.map((service) => (
          <FadeInSection key={service.id}>
            <a
              href={service.link}
              className="block"
            >
              <div className="box bg-sky-900 rounded-lg shadow-lg p-6 hover:bg-sky-950 transition duration-300 flex items-center space-x-4 h-32 cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center text-sky-900">
                  {service.icon}
                </div>
                <div className="text-white">
                  <h5 className="text-lg font-bold">{service.title}</h5>
                </div>
              </div>
            </a>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default DaftarInformasi;
