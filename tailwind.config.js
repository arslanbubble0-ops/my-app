/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#6639e6',
          600: '#5a2fcf',
          700: '#4a24b2',
        },
        accent: {
          500: '#ff7c4c',
          600: '#ff6a35',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}