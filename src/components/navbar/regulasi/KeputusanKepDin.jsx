function KeputusanKepDin() {
    return (
      <div className="mt-28 mb-20 mx-5 my-5 lg:mt-32 lg:mb-10 lg:mx-44 lg:my-36 rounded-2xl flex items-center justify-center min-h-auto bg-sky-800 hover:bg-sky-900 shadow-2xl">
        {/* Wrapper untuk konten */}
        <div className="relative m-7 w-auto lg:w-full lg:max-w-4xl p-6 bg-white rounded-2xl shadow-xl">
          {/* Background dekoratif */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-blue-100 shadow-lg"></div>
          {/* Kontainer utama */}
          <div className="relative">
            {/* Header: Judul dan Tombol */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                SK Penunjukan Pejabat PPID
              </h1>
              <a
                href="/Keputusan-Kepala-Dinas.pdf"
                download
                className="px-5 py-2 text-sm md:text-base font-medium text-white bg-sky-800 rounded-lg hover:bg-sky-950 transition-all duration-300"
              >
                Unduh PDF
              </a>
            </div>
            {/* Konten PDF */}
            <embed
              src="/public/SK_Penunjukan_Pejabat_PPID.pdf"
              type="application/pdf"
              className="w-full h-[70vh] rounded-lg border-2 border-gray-300"
          />
          </div>
        </div>
      </div>
    );
  }
  
  export default KeputusanKepDin;