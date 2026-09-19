/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#BE0F1C',
          redDark: '#8F0A14',
          charcoal: '#242629',
          graphite: '#4A4D52',
          silver: '#D9DADC',
          light: '#F8F9FA',
          white: '#FFFFFF',
          black: '#111214',
        },
      },
    },
  },
  plugins: [],
};
