/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#fbf9f5',
          light: '#fdfcf9',
          muted: '#f2eee6',
          dark: '#e8e2d5',
        },
        teal: {
          deep: '#0f383e',
          DEFAULT: '#164e54',
          muted: '#245f66',
          light: '#e6f0f0',
        },
        wood: {
          DEFAULT: '#a87950',
          light: '#c8996e',
          dark: '#7a5232',
        },
        champagne: {
          DEFAULT: '#d8b97c',
          soft: '#ebdcbe',
          light: '#f5ecd9',
        },
        charcoal: {
          DEFAULT: '#1c2826',
          soft: '#364547',
          muted: '#637375',
        },
        dusty: {
          DEFAULT: '#5a738e',
          light: '#7f95ac',
          soft: '#e7ecf2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}