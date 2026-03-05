/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E4A6F',
        primarySoft: '#D3E2F2',
        secondary: '#F5A623',
        accent: '#0F766E',
        muted: '#6B7280',
        background: '#F9FAFB',
      },
      boxShadow: {
        'soft-card': '0 10px 25px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

