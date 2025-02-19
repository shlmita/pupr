/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dots': "url('/wiggle.svg')", // Tambahkan path gambar pattern
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
