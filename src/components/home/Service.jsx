import { User, Info, FileText, Database, Briefcase, Folder, BookOpen, Mail, Landmark } from "lucide-react";
import FadeInSection from "../FadeInSection";

const Service = () => {
  const services = [
    { id: 1, title: "Profil", desc: "Informasi tentang instansi.", icon: <User />, link: "https://example.com/profil" },
    { id: 2, title: "Info", desc: "Berita dan pengumuman terbaru.", icon: <Info />, link: "https://example.com/info" },
    { id: 3, title: "Regulasi", desc: "Aturan dan peraturan yang berlaku.", icon: <FileText />, link: "https://example.com/regulasi" },
    { id: 4, title: "Data", desc: "Statistik dan data publik.", icon: <Database />, link: "https://example.com/data" },
    { id: 5, title: "Bidang", desc: "Struktur dan bidang kerja.", icon: <Briefcase />, link: "https://example.com/bidang" },
    { id: 6, title: "PPID", desc: "Pejabat Pengelola Informasi.", icon: <Folder />, link: "https://example.com/ppid" },
    { id: 7, title: "Buku Tamu", desc: "Catatan tamu dan saran.", icon: <BookOpen />, link: "https://example.com/buku-tamu" },
    { id: 8, title: "Kontak Kami", desc: "Hubungi kami dengan mudah.", icon: <Mail />, link: "https://pupr-eta.vercel.app/bukutamu" },
    { id: 9, title: "SIDAMBA", desc: "Sistem Informasi Data Aset Jembatan.", icon: <Landmark />, link: "https://sidamba.dpupr.grobogan.go.id/" },
  ];

  return (
    <div className="service px-4 lg:px-8 pb-6">
      <FadeInSection>
        <h1 className="text-center lg:text-5xl/tight text-3xl font-medium mb-2">Layanan</h1>
        <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
      </FadeInSection>

      <div className="services-box pt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-center">
        {services.map((service) => (
          <FadeInSection key={service.id}>
            <a href={service.link} target="_blank" rel="noopener noreferrer" className="block">
              <div className="box bg-sky-900 rounded-lg shadow-lg p-5 hover:bg-sky-950 transition duration-300 flex items-center space-x-4 h-28 cursor-pointer">
                <div className="w-14 h-14 bg-white rounded-full flex justify-center items-center">
                  {service.icon}
                </div>
                <div className="text-white">
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <p className="text-sm">{service.desc}</p>
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
