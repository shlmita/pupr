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
import Users from "./pages/admin/Users";
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



function App() {
  return (
    <Router>
      <Routes>
        {/* Rute untuk User */}
        <Route path="/" element={<UserLayout />}>
          <Route path="home" element={<HomePage />} />
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
          <Route path="users" element={<Users />} />
          <Route path="news" element={<News />} />
          <Route path="workplan" element={<Workplan />} />
          <Route path="publikasi" element={<Publikasi />} />
          <Route path="artikel" element={<Artikel />} />
          <Route path="video" element={<Video />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
