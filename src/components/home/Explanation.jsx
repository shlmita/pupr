import HeroImage from "../../assets/images/hero.svg";
import AboutImage from "../../assets/images/about.svg";
import FadeInSection from "../FadeInSection";

const Explanation = () => {
    return (
        <div className="explanation">
            {/* Hero Section */}
            <div className="hero grid md:grid-cols-2 grid-cols-1 items-center">
                <FadeInSection>
                    <div className="box">
                        <h1 className="lg:text-5xl/tight text-3xl font-medium mb-5">
                            DPUPR Grobogan
                            <br />
                            <span className="font-bold text-sky-700">
                                Dinas Pekerjaan Umum dan Penataan Ruang
                            </span>
                        </h1>
                        <p className="text-base/8 mb-2">Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Grobogan merupakan unsur pelaksana urusan pemerintahan di bidang pekerjaan umum, penataan ruang dan pertanahan yang menjadi kewenangan daerah.</p>
                        <p className="text-base/8 mb-7">Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Grobogan mempunyai tugas membantu Bupati melaksanakan urusan pemerintahan bidang pekerjaan umum dan penataan ruang serta bidang pertanahan yang menjadi tugas pembantuan yang diberikan kepada daerah.</p>
                        <a href="#" className="bg-sky-800 hover:bg-sky-950 transition-all py-2 px-4 text-white shadow rounded-full">
                            Tentang Kami
                            <i className="ri-eye-line ms-1"></i>
                        </a>
                    </div>
                </FadeInSection>

                <FadeInSection>
                    <div className="box">
                        <img src={HeroImage} alt="Hero Image" className="md:w-full w-[300px] mx-auto md:m-0 md:mt-20" />
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
};

export default Explanation;
