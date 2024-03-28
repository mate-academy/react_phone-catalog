/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '640px',
      lg: '1200px',
      xl: '1440px',
    },
    colors: {
      'primary': '#313237',
      'secondary': '#89939A',
      'icons': '#B4BDC3',
      'elements': '#E2E6E9',
      'hoverBG': '#FAFBFC',
      'white': '#FFFFFF',
      'green': '#27AE60',
      'red': '#EB5757',
    },
    fontFamily: {
      mont: ['Mont', 'sans-serif'],
    },
    extend: {
      cursor: {
        default: 'url(/src/images/cursor-mouse-mice.svg), default'
      },
      height: {
        5.5: '1.375rem',
      },
      lineHeight: {
        14: '3.5rem',
      },
    },
  },
  plugins: [],
}

