import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaFacebook, FaInstagram, FaYoutube, FaTelegram, FaPhone, FaEnvelope, FaGlobe, FaTwitter } from "react-icons/fa";
import "../styles/CalendarStyles.css";

const Footer = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [visitorCount, setVisitorCount] = useState(0);

    // Update waktu berjalan real-time
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Hitung jumlah pengunjung
    useEffect(() => {
        const count = localStorage.getItem("visitorCount") || "0";
        const newCount = parseInt(count, 10) + 1;
        localStorage.setItem("visitorCount", newCount.toString());
        setVisitorCount(newCount);
    }, []);

    return (
        <footer id="id_footer" className="bg-gray-900 text-white py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10 px-6">
                
                {/* Kalender */}
                <div className="bg-white p-4 rounded-xl shadow-lg text-black">
                    <Calendar value={currentDate} className="custom-calendar" />
                </div>

                {/* Informasi */}
                <div className="text-center">
                    <h2 className="text-lg font-bold">DPUPR Grobogan</h2>
                    <p className="text-sm mt-2">Dinas Pekerjaan Umum dan Penataan Ruang</p>
                    <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Semua Hak Dilindungi</p>
                    
                    {/* Jumlah Pengunjung */}
                    <p className="text-sm mt-4 bg-gray-800 px-4 py-2 rounded-md">
                        Jumlah Pengunjung: <span className="font-bold">{visitorCount}</span>
                    </p>
                </div>

                {/* Peta Lokasi */}
                <div className="bg-white p-4 rounded-xl shadow-lg w-full md:w-auto">
                    <h3 className="text-black text-sm font-bold mb-2 text-center">Lokasi Kantor</h3>
                    <iframe 
                        title="DPUPR Grobogan Map"
                        className="rounded-md w-full h-[150px]"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11817.065626771053!2d110.87417124243643!3d-7.082626080043029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70ba850f1843fd%3A0x5afd56d0446485cd!2sDinas%20Pekerjaan%20Umum%20dan%20Penataan%20Ruang%20(DPUPR)%20Kabupaten%20Grobogan!5e0!3m2!1sid!2sid!4v1738647533958!5m2!1sid!2sid"
                        width="100%" 
                        height="250px" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>

                {/* Sosial Media & Kontak */}
                <div className="flex flex-col items-center gap-4">
                    {/* Ikon Sosial Media */}
                    <div className="flex space-x-4">
                        <a href="https://web.facebook.com/dpupr.grobogan.1?_rdc=1&_rdr#" className="text-white text-2xl hover:text-blue-500 transition"><FaFacebook /></a>
                        <a href="https://www.instagram.com/dpuprgrobogan/" className="text-white text-2xl hover:text-pink-500 transition"><FaInstagram /></a>
                        <a href="https://www.youtube.com/results?search_query=dpupr+grobogan" className="text-white text-2xl hover:text-red-500 transition"><FaYoutube /></a>
                        <a href="https://x.com/i/flow/login?redirect_after_login=%2FDPUPR_GROBOGAN" className="text-white text-2xl hover:text-blue-400 transition"><FaTwitter /></a>
                    </div>

                    {/* Informasi Kontak */}
                    <div className="text-sm text-center mt-4">
                        <p className="flex items-center justify-center gap-2"><FaPhone /> <span>(029) 25139140</span></p>
                        <p className="flex items-center justify-center gap-2">
                          <FaEnvelope />
                            <a href="dpupr.grobogan@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                mail.dpupr-grobogan.go.id
                            </a>
                        </p>
                        <p className="flex items-center justify-center gap-2">
                            <FaGlobe /> 
                            <a href="https://pupr-eta.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                www.dpupr-grobogan.go.id
                            </a>
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;