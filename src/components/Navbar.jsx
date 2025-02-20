import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import BukuTamu from './navbar/BukuTamu';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    // Toggle sidebar menu
    const handleClick = () => {
        setShow(!show);
        setOpenDropdown(null); // Tutup dropdown jika menu dibuka/ditutup
    };

    // Toggle dropdown menu
    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 5) {
                setScroll(true);
                setShow(false);
                setOpenDropdown(null);
            } else {
                setScroll(false);
            }
        };

        const handleClickOutside = (event) => {
            if (
                openDropdown !== null && 
                !event.target.closest(".dropdown") // Cek apakah klik di luar dropdown
            ) {
                setOpenDropdown(null);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [openDropdown]);

    // Menentukan class untuk navbar saat scroll
    let scrollActive = scroll ? "py-6 bg-white shadow-lg transition-all duration-300" : "py-5";
    let menuActive = show ? "left-0" : "-left-full";

    return (
        <div className={`navbar fixed w-full transition-all z-50 ${scrollActive}`}>
            <div className="container mx-auto px-9">
                <div className="navbar-box flex items-center justify-between">
                    <div className="logo">
                        <img src={logo} alt="Logo" className="h-20 w-auto mr-4" />
                    </div>
                    <ul className={`flex lg:gap-7 lg:mb-5 md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:text-black md:p-0 md:m-0 md:transition-none gap-2 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-6 py-6 rounded shadow-slate-900 bg-sky-900 text-white transition-all md:mt-5`}>

                        {/* Home */}
                        <li className='flex items-center gap-1'>
                            <i className="ri-home-2-line text-3xl md:hidden block"></i>
                            <a href="/home" className="font-medium flex item-center">HOME</a>
                        </li>

                        {/* Dropdown Profil */}
                        <li className="dropdown relative">
                            <button onMouseDown={(e) => { e.stopPropagation(); toggleDropdown(1); }} className="py-2 font-medium flex items-center gap-1">
                                <i className="ri-user-3-line text-3xl md:hidden block"></i> PROFIL
                                <i className={`ri-arrow-down-s-line transition-transform ${openDropdown === 1 ? "rotate-180" : ""}`}></i>
                            </button>
                            {openDropdown === 1 && (
                                <ul className="absolute left-0 mt-2 bg-white text-black w-40 shadow-lg rounded-md z-50 md:max-h-[300px] overflow-auto">
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => window.location.href = "/profil/strukturOrganisasi"}>Struktur Organisasi</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => window.location.href = "/profil/tupoksi"}>Tupoksi</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => window.location.href = "/profil/rencanaStrategis"}>Rencana Strategis</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => window.location.href = "/profil/rencanaKerja"}>Rencana Kerja</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => window.location.href = "/profil/daftarPejabat"}>Daftar Pejabat</li>
                                    {/* <li className="p-2 hover:bg-gray-200 cursor-pointer">Kontak Kami</li> */}
                                </ul>
                            )}
                        </li>

                        {/* Dropdown Info */}
                        <li className="dropdown relative">
                            <button onMouseDown={(e) => { e.stopPropagation(); toggleDropdown(2); }} className="py-2 font-medium flex items-center gap-1">
                                <i className="ri-megaphone-line text-3xl md:hidden block"></i> INFO
                                <i className={`ri-arrow-down-s-line transition-transform ${openDropdown === 2 ? "rotate-180" : ""}`}></i>
                            </button>

                            {openDropdown === 2 && (
                                <ul className="absolute left-0 mt-2 bg-white text-black w-48 shadow-lg rounded-md z-50
                                max-h-none overflow-visible sm:max-h-[300px] sm:overflow-y-auto md:max-h-[300px] md:overflow-y-auto lg:max-h-none lg:overflow-visible">                              
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => window.location.href = "/info/infoTerkini"}>Info Terkini</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => window.location.href = "/info/publikasi"}>Publikasi</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => window.location.href = "/info/artikel"}>Artikel</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Standart dan Juknis</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">RUP</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">RFK</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => window.location.href = "/info/video"}>Video</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Barang dan Jasa</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">SOP</li>
                                    {/* SAKIP dengan Submenu */}
                                    <li className="relative group">
                                        <button className="w-full text-left p-2 hover:bg-gray-200 flex justify-between">
                                            SAKIP <i className="ri-arrow-right-s-line"></i>
                                        </button>

                                        {/* Submenu untuk SAKIP */}
                                        <ul className="absolute left-full top-0 mt-0 bg-white text-black w-48 shadow-lg rounded-md hidden group-hover:block">
                                            <li className="p-2 hover:bg-gray-200 cursor-pointer">SAKIP 2022</li>
                                        </ul>
                                    </li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Informasi Tata Ruang</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Pranala Luar</li>
                                </ul>
                            )}
                        </li>

                        {/* Dropdown Regulasi */}
                        <li className="dropdown relative">
                            <button onMouseDown={(e) => { e.stopPropagation(); toggleDropdown(3); }} className="py-2 font-medium flex items-center gap-1">
                                <i className="ri-auction-line text-3xl md:hidden block"></i> REGULASI
                                <i className={`ri-arrow-down-s-line transition-transform ${openDropdown === 3 ? "rotate-180" : ""}`}></i>
                            </button>

                            {openDropdown === 3 && (
                                <ul className="absolute left-0 mt-2 bg-white text-black w-48 shadow-lg rounded-md z-50">
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Keputusan Bupati</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Keputusan Kepala Dinas</li>
                                </ul>
                            )}
                        </li>

                        {/* Dropdown Data */}
                        <li className="dropdown relative">
                            <button onMouseDown={(e) => { e.stopPropagation(); toggleDropdown(4); }} className="py-2 font-medium flex items-center gap-1">
                                <i className="ri-donut-chart-fill text-3xl md:hidden block"></i>DATA
                                <i className={`ri-arrow-down-s-line transition-transform ${openDropdown === 4 ? "rotate-180" : ""}`}></i>
                            </button>

                            {openDropdown === 4 && (
                                <ul className="absolute left-0 mt-2 bg-white text-black w-48 shadow-lg rounded-md z-50 sm:max-h-[250px] sm:overflow-y-auto md:max-h-[250px] md:overflow-y-auto lg:max-h-none lg:overflow-visible">
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Data Jalan</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Data Jembatan</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Data Peralatan</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Aset Dinas</li>
                                    
                                    {/* Peta dengan Submenu */}
                                    <li className="relative group">
                                        <button className="w-full text-left p-2 hover:bg-gray-200 flex justify-between items-center">
                                            Peta 
                                            <i className="ri-arrow-right-s-line transition-transform group-hover:rotate-90"></i>
                                        </button>

                                        {/* Submenu untuk Peta */}
                                        <ul className="absolute left-full top-0 ml-2 bg-white text-black w-48 shadow-lg rounded-md hidden group-hover:block">
                                            <li className="p-2 hover:bg-gray-200 cursor-pointer">Peta Jalan</li>
                                            <li className="p-2 hover:bg-gray-200 cursor-pointer">Peta Jalur Alternatif</li>
                                        </ul>
                                    </li>


                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Data Sungai Dan Embung</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Data Irigasi Dan Air Baku</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Data Penataan Ruang</li>
                                </ul>
                            )}
                        </li>

                        {/* Dropdown Bidang */}
                        <li className="dropdown relative">
                            <button onMouseDown={(e) => { e.stopPropagation(); toggleDropdown(5); }} className="py-2 font-medium flex items-center gap-1">
                                <i className="ri-user-community-line text-3xl md:hidden block"> </i> BIDANG
                                <i className={`ri-arrow-down-s-line transition-transform ${openDropdown === 5 ? "rotate-180" : ""}`}></i>
                            </button>

                            {openDropdown === 5 && (
                                <ul className="absolute left-0 mt-2 bg-white text-black w-48 shadow-lg rounded-md z-50 sm:max-h-[250px] sm:overflow-y-auto md:max-h-[250px] md:overflow-y-auto lg:max-h-none lg:overflow-visible">
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Bina Marga</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Cipta Karya</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Penataan Ruang</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Perencanaan Dan Bina Konstruksi</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Persungaian Dan Embung</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Irigasi Dan Air Baku</li>
                                </ul>
                            )}
                        </li>

                        {/* Dropdown PPID */}
                        <li className="dropdown relative">
                            <button onMouseDown={(e) => { e.stopPropagation(); toggleDropdown(6); }} className="py-2 font-medium flex items-center gap-1">
                                <i className="ri-file-cloud-line text-3xl md:hidden block"></i> PPID
                                <i className={`ri-arrow-down-s-line transition-transform ${openDropdown === 6 ? "rotate-180" : ""}`}></i>
                            </button>

                            {openDropdown === 6 && (
                                <ul className="absolute left-0 mt-2 bg-white text-black w-48 shadow-lg rounded-md z-50 sm:max-h-[300px] sm:overflow-y-auto md:max-h-[300px] md:overflow-y-auto lg:max-h-none lg:overflow-visible">
                                {/* Daftar IP dengan Submenu */}
                                <li className="relative group">
                                    <button className="w-full text-left p-2 hover:bg-gray-200 flex justify-between items-center">
                                        Daftar IP 
                                        <i className="ri-arrow-right-s-line transition-transform group-hover:rotate-90"></i>
                                    </button>

                                    {/* Submenu untuk Daftar IP */}
                                    <ul className="absolute left-full top-0 ml-2 bg-white text-black w-48 shadow-lg rounded-md hidden group-hover:block">
                                        <li className="p-2 hover:bg-gray-200 cursor-pointer">Informasi Berkala</li>
                                        <li className="p-2 hover:bg-gray-200 cursor-pointer">Informasi Serta Merta</li>
                                        <li className="p-2 hover:bg-gray-200 cursor-pointer">Informasi Setiap Saat</li>
                                    </ul>
                                </li>

                                {/* Ringkasan IP dengan Submenu */}
                                <li className="relative group">
                                    <button className="w-full text-left p-2 hover:bg-gray-200 flex justify-between items-center">
                                        Ringkasan IP 
                                        <i className="ri-arrow-right-s-line transition-transform group-hover:rotate-90"></i>
                                    </button>

                                    {/* Submenu untuk Ringkasan IP */}
                                    <ul className="absolute left-full top-0 ml-2 bg-white text-black w-48 shadow-lg rounded-md hidden group-hover:block">
                                        <li className="p-2 hover:bg-gray-200 cursor-pointer">Laporan Informasi Publik</li>
                                        <li className="p-2 hover:bg-gray-200 cursor-pointer">Laporan Keuangan</li>

                                    </ul>
                                </li>

                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Daftar Informasi</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Form Permohonan</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Form Keberatan Informasi</li>
                                    <li className="p-2 hover:bg-gray-200 cursor-pointer">Maklumat Pelayanan</li>
                                </ul>
                            )}
                        </li>
                        
                        {/* Buku Tamu */}
                        <li className='flex items-center gap-1'>
                            <i className="ri-book-marked-line text-3xl md:hidden block"></i>
                            <a href="/bukutamu" className="font-medium flex item-center">BUKU TAMU</a>
                        </li>
                    </ul>
                    <div className="social flex items-center gap-3">
                        <a href="#id_footer" className="bg-sky-700 px-5 py-2 rounded-full text-white font-bold hover:bg-sky-900 transition-all text-center ">Social Media</a>
                        <i className="ri-menu-3-line text-3xl md:hidden block" onClick={handleClick}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
