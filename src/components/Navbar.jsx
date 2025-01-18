import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [show, setShow] = useState(false);
    const [scroll, setScroll] = useState(false);

    const handleClick = () => {
        setShow(!show);
        //console.log(show);
    }

    let menuActive = show ? "left-0" : "-left-full"

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 5) {
                // console.log("test");
                setScroll(true);
                setShow(false);
            } else {
                setScroll(false);
            }
        })
    })

    let scrollActive = scroll ? "py-6 bg-white shadow" : "py-5"

    return (
      <div className={`navbar fixed w-full transition-all ${scrollActive}`}>
          <div className="container mx-auto px-8">
              <div className="navbar-box flex items-center justify-between">
                  <div className="logo">
                      <img src={logo} alt="Logo" className="h-20 w-auto mr-4" />
                  </div>
                  <ul className={`flex lg:gap-7 lg:mb-5 md:static md:flex-row md:shadow-none md:bg-transparent md:w-auto md:h-full md:translate-y-0 md:text-black md:p-0 md:m-0 md:transition-none gap-6 fixed ${menuActive} top-1/2 -translate-y-1/2 flex-col px-10 py-6 rounded shadow-slate-300 bg-sky-900 text-white transition-all md:mt-5`}>
                      <li className='flex items-center gap-3'>
                            <i class="ri-home-2-line text-3xl md:hidden block"></i>
                            <a href="#" className="font-medium opacity-80">HOME</a>
                      </li>
                      <li className='flex items-center gap-3'>
                            <i class="ri-user-3-line text-3xl md:hidden block"></i>
                            <a href="#" className="font-medium opacity-75">PROFIL</a>
                      </li>
                      <li className='flex items-center gap-3'>
                            <i class="ri-megaphone-line text-3xl md:hidden block"></i>
                            <a href="#" className="font-medium opacity-75">INFO</a>
                      </li>
                      <li className='flex items-center gap-3'>
                            <i class="ri-auction-line text-3xl md:hidden block"></i>
                            <a href="#" className="font-medium opacity-75">REGULASI</a>
                      </li>
                      <li className='flex items-center gap-3'>
                            <i class="ri-donut-chart-fill text-3xl md:hidden block"></i>
                            <a href="#" className="font-medium opacity-75">DATA</a>
                      </li>
                      <li className='flex items-center gap-3'>
                            <i class="ri-user-community-line text-3xl md:hidden block"></i>
                            <a href="#" className="font-medium opacity-75">BIDANG</a>
                      </li>
                      <li className='flex items-center gap-3'>
                            <i class="ri-file-cloud-line text-3xl md:hidden block"></i>
                            <a href="#" className="font-medium opacity-75">PPID</a>
                      </li>
                      <li className='flex items-center gap-3'>
                            <i class="ri-book-marked-line text-3xl md:hidden block"></i>
                            <a href="#" className="font-medium opacity-75">BUKU TAMU</a>
                      </li>
                  </ul>
                  <div className="social flex items-center gap-2">
                      <a href="#" className="bg-sky-700 px-5 py-2 rounded-full text-white font-bold hover:bg-sky-900 transition-all">Social Media</a>
                      <i className="ri-menu-3-line text-3xl md:hidden block o" onClick={handleClick}></i>
                  </div>
              </div>
          </div>
      </div>
    )
}   

export default Navbar