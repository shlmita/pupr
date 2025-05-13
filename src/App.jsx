import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import StrukturOr from "./components/navbar/profil/StrukturOrganisasi";
import Tupoksi from "./components/navbar/profil/Tupoksi";
import RencanaStra from "./components/navbar/profil/RencanaStra";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import News from "./pages/admin/News";
import Settings from "./pages/admin/Settings";
import NewsDetail from "./components/home/NewsDetail";
import Workplan from "./pages/admin/Workplan";
import WorkplanDetail from "./components/navbar/profil/WorkplanDetail";
import RencanaKer from "./components/navbar/profil/RencanaKerja";
import DaftarPejabat from "./components/navbar/profil/DaftarPejabat";
import InfoTerkini from "./components/navbar/info/InfoTerkini";
import Publikasi from "./pages/admin/Publikasi";
import PublikasiDetail from "./components/navbar/info/PublikasiDetail";
import PublikasiUs from "./components/navbar/info/Publikasi";
import Artikel from "./pages/admin/Artikel";
import ArtikelDetail from "./components/navbar/info/ArtikelDetail";
import ArtikelUs from "./components/navbar/info/Artikel";
import Video from "./pages/admin/Video";
import VideoDetail from "./components/navbar/info/VideoDetail";
import VideoUs from "./components/navbar/info/Video";
import BukuTamu from "./pages/admin/BukuTamu";
import BukuTamuUs from "./components/navbar/BukuTamu";
import BpkForm from "./pages/admin/BpkForm";
import StandartJuknis from "./components/navbar/info/StandartJuknis";
import StandartJuknisDetail from "./components/navbar/info/StandartJuknisDetail";
import RUP from "./components/navbar/info/RUP";
import RUPDetail from "./components/navbar/info/RUPDetail";
import RFK from "./components/navbar/info/RFK";
import RFKDetail from "./components/navbar/info/RFKDetail";
import BarangJasa from "./components/navbar/info/BarangJasa";
import BarangJasaDetail from "./components/navbar/info/BarangJasaDetail";
import SOP from "./components/navbar/info/SOP";
import SOPDetail from "./components/navbar/info/SOPDetail";
import Sakip from "./components/navbar/info/Sakip";
import SakipDetail from "./components/navbar/info/SAKIPDetail";
import Peranalan from "./components/navbar/info/Peranalan";
import KeputusanBup from "./components/navbar/regulasi/KeputusanBup";
import KeputusanKepDin from "./components/navbar/regulasi/KeputusanKepDin";
import DataJalan from "./components/navbar/data/DataJalan";
import DataJalanDetail from "./components/navbar/data/DataJalanDetail";
import DataJembatan from "./components/navbar/data/DataJembatan";
import DataJembatanDetail from "./components/navbar/data/DataJembatanDetail";
import DataPeralatan from "./components/navbar/data/DataPeralatan";
import AsetDinas from "./components/navbar/data/AsetDinas";
import AsetDinasDetail from "./components/navbar/data/AsetDinasDetail";
import PetaJalan from "./components/navbar/data/PetaJalan";
import PetaJalanDetail from "./components/navbar/data/PetaJalanDetail";
import PetaJalur from "./components/navbar/data/PetaJalur";
import PetaJalurDetail from "./components/navbar/data/PetaJalurDetail";
import SungaiEmbung from "./components/navbar/data/SungaiEmbung";
import SungaiEmbungDetail from "./components/navbar/data/SungaiEmbungDetail";
import Irigasi from "./components/navbar/data/Irigasi";
import IrigasiDetail from "./components/navbar/data/IrigasiDetail";
import CiptaKarya from "./components/navbar/bidang/CiptaKarya";
import PenataanRuang from "./components/navbar/bidang/PenataanRuang";
import InfoBerkala from "./components/navbar/ppid/InformasiBerkala";
import InfoSertaMerta from "./components/navbar/ppid/InformasiSertaMerta";
import InfoSetiapSaat from "./components/navbar/ppid/InformasiSetiapSaat";
import LaporanKeuangan from "./components/navbar/ppid/LaporanKeuangan";
import LaporanKeuanganDetail from "./components/navbar/ppid/LaporanKeuanganDetail";
import DaftarInformasi from "./components/navbar/ppid/DaftarInformasi";
import DaftarInfoPublik from "./components/navbar/ppid/DaftarInformasiPublik";
import PermohonanInformasi from "./components/navbar/ppid/PermohonanInformasi";
import KeberatanInformasi from "./components/navbar/ppid/KeberatanInformasi";
import MaklumatPelayanan from "./components/navbar/ppid/MaklumatPelayanan";


function App() {
  return (
    <Router>
      <Routes>
        {/* Rute untuk User */}
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="profil/strukturOrganisasi" element={<StrukturOr />} />
          <Route path="profil/tupoksi" element={<Tupoksi />} />
          <Route path="profil/rencanaStrategis" element={<RencanaStra />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="workplan/:id" element={<WorkplanDetail />} />
          <Route path="/publikasi/:id" element={<PublikasiDetail />} />
          <Route path="profil/rencanaKerja" element={<RencanaKer />} />
          <Route path="profil/daftarPejabat" element={<DaftarPejabat />} />
          <Route path="info/infoTerkini" element={<InfoTerkini />} />
          <Route path="info/publikasi" element={<PublikasiUs />} />
          <Route path="/artikel/:id" element={<ArtikelDetail />} />
          <Route path="info/artikel" element={<ArtikelUs />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="info/video" element={<VideoUs />} />
          <Route path="info/standartJuknis" element={<StandartJuknis />} />
          <Route path="/standart-juknis/:slug" element={<StandartJuknisDetail />} />
          <Route path="/info/RUP" element={<RUP />} />
          <Route path="/rup/:slug" element={<RUPDetail />} />
          <Route path="/info/RFK" element={<RFK />} />
          <Route path="/rfk/:slug" element={<RFKDetail />} />
          <Route path="/info/barang-jasa" element={<BarangJasa />} />
          <Route path="/barang-jasa/:slug" element={<BarangJasaDetail />} />
          <Route path="/info/SOP" element={<SOP />} />
          <Route path="/SOP/:slug" element={<SOPDetail />} />
          <Route path="/info/sakip" element={<Sakip />} />
          <Route path="/sakip/:slug" element={<SakipDetail />} />
          <Route path="/info/peranalan-luar" element={<Peranalan />} />
          <Route path="/regulasi/keputusan-bupati" element={<KeputusanBup />} />
          <Route path="/regulasi/keputusan-kepala-dinas" element={<KeputusanKepDin />} />
          <Route path="/data/data-jalan" element={<DataJalan />} />
          <Route path="/data-jalan/:slug" element={<DataJalanDetail />} />
          <Route path="/data/data-jembatan" element={<DataJembatan />} />
          <Route path="/data-jembatan/:slug" element={<DataJembatanDetail />} />
          <Route path="/data/data-peralatan" element={<DataPeralatan />} />          
          <Route path="/data/aset-dinas" element={<AsetDinas />} />
          <Route path="/aset-dinas/:slug" element={<AsetDinasDetail />} />
          <Route path="/data/peta-jalan" element={<PetaJalan />} />
          <Route path="/peta-jalan/:slug" element={<PetaJalanDetail />} />
          <Route path="/data/peta-jalur" element={<PetaJalur />} />
          <Route path="/peta-jalur/:slug" element={<PetaJalurDetail />} />
          <Route path="/data/sungai-dan-embung" element={<SungaiEmbung />} />
          <Route path="/sungai-dan-embung/:slug" element={<SungaiEmbungDetail />} />
          <Route path="/data/irigasi-dan-air-baku" element={<Irigasi />} />
          <Route path="/irigasi-dan-air-baku/:slug" element={<IrigasiDetail />} />
          <Route path="/bidang/cipta-karya" element={<CiptaKarya />} />
          <Route path="/bidang/penataan-ruang" element={<PenataanRuang />} />
          <Route path="/ppid/informasi-berkala" element={<InfoBerkala />} />
          <Route path="/ppid/informasi-serta-merta" element={<InfoSertaMerta />} />
          <Route path="/ppid/informasi-setiap-saat" element={<InfoSetiapSaat />} />
          <Route path="/ppid/laporan-keuangan" element={<LaporanKeuangan />} />
          <Route path="/laporan-keuangan/:slug" element={<LaporanKeuanganDetail />} />
          <Route path="/ppid/daftar-informasi" element={<DaftarInformasi />} />
          <Route path="/ppid/daftar-informasi-publik" element={<DaftarInfoPublik />} />
          <Route path="/ppid/form-permohonan-informasi" element={<PermohonanInformasi />} />
          <Route path="/ppid/form-keberatan-informasi" element={<KeberatanInformasi />} />
          <Route path="/ppid/maklumat-pelayanan-publik" element={<MaklumatPelayanan />} />
          <Route path="bukutamu" element={<BukuTamuUs />} />
        </Route>

        {/* Rute untuk Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bukutamu" element={<BukuTamu />} />
          <Route path="news" element={<News />} />
          <Route path="workplan" element={<Workplan />} />
          <Route path="publikasi" element={<Publikasi />} />
          <Route path="artikel" element={<Artikel />} />
          <Route path="video" element={<Video />} />
          <Route path="BPK" element={<BpkForm />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
