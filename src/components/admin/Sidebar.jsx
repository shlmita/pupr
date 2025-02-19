import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, Home, Users, FileText, Settings, LogOut, ClipboardList, BookOpen, Newspaper, Video } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} /> },
    { name: "Kelola Pengguna", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Kelola Berita", path: "/admin/news", icon: <FileText size={20} /> },
    { name: "Kelola Rencana Kerja", path: "/admin/workplan", icon: <ClipboardList size={20} /> },
    { name: "Publikasi", path: "/admin/publikasi", icon: <BookOpen size={20} /> },
    { name: "Artikel", path: "/admin/artikel", icon: <Newspaper size={20} /> },
    { name: "Video", path: "/admin/video", icon: <Video size={20} /> },
    { name: "Pengaturan", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="p-2 text-white bg-sky-950 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-sky-950 text-white p-5 w-64 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:flex lg:flex-col lg:h-full z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-6 px-10">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition-all ${
                  isActive ? "bg-sky-900" : "hover:bg-sky-900"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.href = "/admin/login";
          }}
          className="flex items-center gap-3 px-4 py-2 mt-6 bg-red-700 text-white rounded hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Content Wrapper to Avoid Overlapping */}
      <div className="lg:ml-64 flex-1 p-4 bg-gray-100">
        {/* Your Page Content Goes Here */}
      </div>
    </div>
  );
};

export default Sidebar;