import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/", // Pastikan ini ada
  server: {
    historyApiFallback: true, // Pastikan ini juga ada agar routing client-side bekerja
  },
});
