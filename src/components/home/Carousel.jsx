import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gambar1 from "../../../src/assets/images/proyek-1.jpg";

const slides = [
    { image: gambar1, title: "Judul Slide 1", description: "Deskripsi singkat slide pertama." },
    { image: "/src/assets/images/proyek-2.jpeg", title: "Judul Slide 2", description: "Deskripsi singkat slide kedua." },
];

const Carousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 70000); // Slide berubah setiap 5 detik
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            <AnimatePresence>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={slides[index].image}
                        src={slides[index].image}
                        alt="Slide"
                        className="w-full h-full object-cover rounded-lg absolute top-0 left-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.30 }}
                    />
                </AnimatePresence>
            </AnimatePresence>

            {/* Kontainer Teks di Atas Gambar */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center p-4 rounded-lg">
                <motion.h2
                    key={slides[index].title}
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {slides[index].title}
                </motion.h2>
                <motion.p
                    key={slides[index].description}
                    className="text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.10 }}
                >
                    {slides[index].description}
                </motion.p>
            </div>

            {/* Indikator Slide */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`w-3 h-3 rounded-full transition ${
                            i === index ? "bg-sky-800" : "bg-sky-950"
                        }`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
