import HeroImage from "../assets/images/hero.svg";
import AboutImage from "../assets/images/about.svg";
import Proyek1 from "../assets/images/proyek-1.webp";
import Proyek2 from "../assets/images/proyek-2.webp";
import Proyek3 from "../assets/images/proyek-3.webp";
import Proyek4 from "../assets/images/proyek-4.webp";

const HomePage = () => {
  return (
    <div className="homepage pb-10">
      <div className="container mx-auto px-4">
        <div className="hero grid md:grid-cols-2 grid-cols-1 items-center gap-20 pt-32">
          <div className="box">
            <h1 className="lg:text-5xl/tight text-3xl font-medium mb-7">
              DPUPR Grobogan <h1> </h1>
              <span className="font-bold text-sky-700"> Dinas Pekerjaan Umum dan Penataan Ruang</span>
            </h1>
            <p className="text-base/8 mb-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ad pariatur neque officia obcaecati tenetur alias, quis at in, sit repellendus, consequuntur assumenda quam quaerat nobis ratione totam aut distinctio.
            </p>
            <a href="#" className="bg-sky-800 hover:bg-sky-950 transition-all py-2 px-4 text-white shadow rounded-full">
              Tentang Kami
              <i className="ri-eye-line ms-1"></i>
            </a>
          </div>
          <div className="box">
            <img src={HeroImage} alt="Hero Image" className="md:w-full w-[400px] mx-auto md:m-0" />
          </div>
        </div>

        <div className="about grid md:grid-cols-2 grid-cols-1 items-center md:gap-20 md:gap-10 md:pt-20 pt-3">
          <div className="box md:order-1 order-2">
            <img src={AboutImage} alt="About Image" className="lg:w-[500px] w-[400px] md:m-0 mx-auto" />
          </div>
          <div className="box md:order-2 order-1">
            <h1 className="lg:text-5xl/tight text-3xl font-medium mb-7">
              DPUPR Grobogan <h1> </h1>
              <span className="font-bold text-sky-700"> Dinas Pekerjaan Umum dan Penataan Ruang</span>
            </h1>
            <p className="text-base/loose">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ad pariatur neque officia obcaecati tenetur alias, quis at in, sit repellendus, consequuntur assumenda quam quaerat nobis ratione totam aut distinctio.
            </p>
          </div>
        </div>

        <div className="services pt-32">
          <h1 className="text-center lg:text-5xl/tight text-3xl font-medium mb-2">Layanan</h1>
          <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
          <div className="services-box pt-12 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            <div className="box bg-gray-500 rounded-lg shadow p-4">
              <i className="ri-number-1 text-3xl text-white"></i>
              <h3 className="text-xl font-bold text-white mt-6 mb-2">Service Name</h3>
              <p className="text-white text-base/loose">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, ut!</p>
            </div>
            <div className="box bg-gray-500 rounded-lg shadow p-4">
              <i className="ri-number-2 text-3xl text-white"></i>
              <h3 className="text-xl font-bold text-white mt-6 mb-2">Service Name</h3>
              <p className="text-white text-base/loose">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, ut!</p>
            </div>
            <div className="box bg-gray-500 rounded-lg shadow p-4">
              <i className="ri-number-3 text-3xl text-white"></i>
              <h3 className="text-xl font-bold text-white mt-6 mb-2">Service Name</h3>
              <p className="text-white text-base/loose">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, ut!</p>
            </div>
          </div>
        </div>

        <div className="proyek pt-32">
          <h1 className="text-center lg:text-5xl/tight text-3xl font-medium mb-2">Proyek</h1>
          <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
          <div className="proyek-box pt-12 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            <div className="box p-2 bg-white shadow">
              <img src={Proyek1} alt="Proyek Image" className="w-full h-[220px]" />
              <h3 className="text-xl font-bold text-black mt-6 mb-2">Name</h3>
              <p className="text-black text-base/loose">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate soluta harum corrupti? Ab, quos!</p>
            </div>
            <div className="box p-2 bg-white shadow">
              <img src={Proyek2} alt="Proyek Image" className="w-full h-[220px]" />
              <h3 className="text-xl font-bold text-black mt-6 mb-2">Name</h3>
              <p className="text-black text-base/loose">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate soluta harum corrupti? Ab, quos!</p>
            </div>
            <div className="box p-2 bg-white shadow">
              <img src={Proyek3} alt="Proyek Image" className="w-full h-[220px]" />
              <h3 className="text-xl font-bold text-black mt-6 mb-2">Name</h3>
              <p className="text-black text-base/loose">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate soluta harum corrupti? Ab, quos!</p>
            </div>
            <div className="box p-2 bg-white shadow">
              <img src={Proyek4} alt="Proyek Image" className="w-full h-[220px]" />
              <h3 className="text-xl font-bold text-black mt-6 mb-2">Name</h3>
              <p className="text-black text-base/loose">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate soluta harum corrupti? Ab, quos!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage