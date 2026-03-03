/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        primarySoft: "#DBEAFE",
        accent: "#F97316",
        muted: "#6B7280",
        background: "#F9FAFB"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
};
