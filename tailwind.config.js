/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-black': '#1d1d1f',
        'apple-gray': {
          '100': '#f5f5f7',
          '200': '#e8e8ed',
          '300': '#d2d2d7',
        },
        'light-blue': {
          '300': '#93c5fd',
          '500': '#3b82f6',
          '700': '#1d4ed8',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        'scale-in-up': {
          '0%': {
            transform: 'translateY(30px) scale(0.95)',
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
          },
        },
      },
      animation: {
        floating: 'floating 5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in-up': 'scale-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(59, 130, 246, 0.4), 0 0 5px rgba(59, 130, 246, 0.6)',
        'card': '0 10px 30px -15px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}