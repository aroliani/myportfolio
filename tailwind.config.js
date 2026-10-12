/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#050e12',
          900: '#08161c',
          800: '#0d2029',
          700: '#143040',
          600: '#1c4152',
        },
        loch: {
          200: '#c8f5e8',
          300: '#7ff0d4',
          400: '#4fdcc0',
          500: '#2bb894',
          600: '#1f9a7c',
          700: '#1c7f66',
        },
        ember: {
          200: '#ffe9bd',
          300: '#ffd98a',
          400: '#f5c163',
          500: '#eaa83a',
          600: '#d18a22',
        },
        heather: {
          200: '#ddd0ff',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
        },
        mist: '#d6ece7',
        parchment: '#f4ead3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
        display: ['Cinzel', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(52, 201, 165, 0.18)',
        emberglow: '0 0 26px rgba(234, 168, 58, 0.22)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'ember-pulse': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'sheen': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'ember-pulse': 'ember-pulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
