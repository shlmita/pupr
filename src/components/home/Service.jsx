import { User, Info, FlaskConical, Database, Landmark, Truck, CloudRain, Mail, Book } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FadeInSection from "../FadeInSection";

const Service = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#id_footer") {
      const footer = document.getElementById("id_footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const services = [
    { id: 1, title: "Sertifikasi", desc: "Rekomendasi Sertifikasi Laik Fungsi", icon: <User /> },
    { id: 2, title: "Info", desc: "Informasi Tata Ruang", icon: <Info />, link: "https://sipr.grobogan.go.id/cgi-sys/defaultwebpage.cgi" },
    { id: 3, title: "Laboratorium", desc: "Sewa Alat Laboratorium Pengujian", icon: <FlaskConical /> },
    { id: 4, title: "PBJ", desc: "Rekomendasi Pemakaian Berm Jalan", icon: <Landmark /> },
    { id: 5, title: "Alat", desc: "Sewa Alat Berat", icon: <Truck /> },
    { id: 6, title: "Banjir", desc: "Rekomendasi Bebas Banjir/Peil Banjir", icon: <CloudRain /> },
    { id: 7, title: "Buku Tamu", desc: "Catatan tamu dan saran.", icon: <Book />, link: "/bukutamu" },
    { id: 8, title: "Kontak Kami", desc: "Hubungi kami dengan mudah.", icon: <Mail />, link: "#id_footer" },
    { id: 9, title: "SIDAMBA", desc: "Sistem Informasi Data Aset Jembatan", icon: <Database />, link: "https://sidamba.dpupr.grobogan.go.id/" },
  ];

  return (
    <div className="service px-4 lg:px-8 pb-6">
      <FadeInSection>
        <h1 className="text-center lg:text-5xl text-3xl font-medium mb-4">Layanan</h1>
        <p className="text-center">
          Jenis-Jenis Pelayanan di Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Grobogan
        </p>
      </FadeInSection>

      <div className="services-box pt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-center">
        {services.map((service) => (
          <FadeInSection key={service.id}>
            <a 
              href={service.link || "#"} 
              target={service.link?.startsWith("http") ? "_blank" : "_self"} 
              rel="noopener noreferrer" 
              className="block"
            >
              <div className="box bg-sky-900 rounded-lg shadow-lg p-6 hover:bg-sky-950 transition duration-300 flex items-center space-x-4 h-32 cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center">
                  {service.icon}
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-sm opacity-90">{service.desc}</p>
                </div>
              </div>
            </a>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default Service;
