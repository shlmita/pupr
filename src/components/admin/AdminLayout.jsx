import Sidebar from "./Sidebar"; // Sidebar admin
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-6">
        <Outlet /> {/* Tempat untuk me-render halaman admin berdasarkan route */}
      </div>
    </div>
  );
};

export default AdminLayout;
