import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi sederhana (ganti dengan autentikasi sebenarnya)
    if (username === "admin" && password === "password123") {
      localStorage.setItem("isAdmin", "true"); // Simpan status login ke localStorage
      navigate("/admin/dashboard"); // Arahkan ke halaman admin dashboard
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="w-full items-center bg-dots bg-repeat bg-[size:600px] flex justify-center min-h-screen bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 bg-neutral-50  rounded-lg shadow-[0_-4px_20px_rgba(0,0,0,0.1),0_4px_20px_rgba(0,0,0,0.1)]"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-sky-500"
            placeholder="Masukkan username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-sky-500"
            placeholder="Masukkan password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
