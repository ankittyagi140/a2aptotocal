/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        green: {
          50: '#e6f7e6',
          100: '#b3eab3',
          200: '#80dd80',
          300: '#4dd04d',
          400: '#1ac31a',
          500: '#00b600',
          600: '#009200',
          700: '#006d00',
          800: '#004900',
          900: '#002400',
        }
      },
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 },
        }
      }
    },
  },
  plugins: [],
}; 