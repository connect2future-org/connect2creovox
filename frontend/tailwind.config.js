/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',   // primary – exact logo magenta-pink
          600: '#db2777',   // dark
          700: '#be185d',   // darker
          800: '#9d174d',
          900: '#831843',
        },
        surface: {
          DEFAULT: '#fffaf5',
          card:    '#ffffff',
          muted:   '#faf6f0',
          dark:    '#0f0f0f',
        },
        ink: {
          DEFAULT: '#111111',
          muted:   '#6b7280',
          subtle:  '#9ca3af',
          light:   '#d1d5db',
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", 'sans-serif'],
        body:    ["'Inter'",         'sans-serif'],
      },
      fontSize: {
        'display-xl': ['5rem',   { lineHeight: '1.05', letterSpacing: '-2px', fontWeight: '800' }],
        'display-lg': ['4rem',   { lineHeight: '1.08', letterSpacing: '-1.5px', fontWeight: '800' }],
        'display-md': ['3rem',   { lineHeight: '1.1',  letterSpacing: '-1px',   fontWeight: '700' }],
        'display-sm': ['2.25rem',{ lineHeight: '1.2',  letterSpacing: '-0.5px', fontWeight: '700' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'brand-sm': '0 4px 16px rgba(236,72,153,0.12)',
        'brand-md': '0 8px 32px rgba(236,72,153,0.18)',
        'brand-lg': '0 20px 60px rgba(236,72,153,0.22)',
        'card':     '0 2px 20px rgba(0,0,0,0.05)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.09)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'blob':       'blob 10s ease-in-out infinite',
        'fade-up':    'fadeUp 0.7s ease forwards',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
      keyframes: {
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        blob:       { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(30px,-20px) scale(1.08)' } },
        fadeUp:     { from: { opacity: 0, transform: 'translateY(32px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseSoft:  { '0%,100%': { opacity: 0.6 }, '50%': { opacity: 1 } },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg,#ec4899,#db2777)',
        'brand-gradient-soft': 'linear-gradient(135deg,#fce7f3,#fdf2f8)',
        'dark-gradient': 'linear-gradient(135deg,#0f0f0f,#1a0a12)',
      },
    },
  },
  plugins: [],
};