const Navbar = () => {
  return (
    <div className="navbar fixed w-full transition-all py-5">
        <div className="container mx-auto px-8">
            <div className="navbar-box flex items-center justify-between">
                <div className="logo">
                    <h1 className="text-2xl font-bold">DPUPR GROBOGAN</h1>
                </div>
                <ul className="flex lg:gap-7 md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:text-black md:p-0 md:m-0 md:transition-none gap-6 fixed left-0 top-1/2 -translate-y-1/2 flex-col px-8 py-6 rounded shadow-slate-300 bg-sky-900 text-white transition-all">
                    <li>
                        <a href="#" className="font-medium opacity-80">HOME</a>
                    </li>
                    <li>
                        <a href="#" className="font-medium opacity-75">PROFIL</a>
                    </li>
                    <li>
                        <a href="#" className="font-medium opacity-75">INFO</a>
                    </li>
                    <li>
                        <a href="#" className="font-medium opacity-75">REGULASI</a>
                    </li>
                    <li>
                        <a href="#" className="font-medium opacity-75">DATA</a>
                    </li>
                    <li>
                        <a href="#" className="font-medium opacity-75">BIDANG</a>
                    </li>
                    <li>
                        <a href="#" className="font-medium opacity-75">PPID</a>
                    </li>
                    <li>
                        <a href="#" className="font-medium opacity-75">BUKU TAMU</a>
                    </li>
                </ul>
                <div className="social">
                    <a href="#" className="bg-sky-700 px-5 py-2 rounded-full text-white font-bold hover:bg-sky-900 transition-all">Social Media</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar