import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-dots bg-white bg-repeat bg-[size:600px]">
      {/* Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Content */}
      <main className="w-full max-w-screen-xl flex-1">
        <Outlet /> {/* Tempat untuk me-render halaman user */}
      </main>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
