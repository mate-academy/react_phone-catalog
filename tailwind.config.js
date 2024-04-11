/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    screens: {
      sm: '320px',
      md: '640px',
      lg: '1200px',
    },
    colors: {
      'primary': '#313237',
      'secondary': '#89939a',
      'icons': '#b4bdc3',
      'elements': '#e2e6e9',
      'hoverBG': '#fafbfc',
      'white': '#ffffff',
      'green': '#27ae60',
      'red': '#eb5757',
    },
    fontFamily: {
      mont: ['Mont', 'sans-serif'],
    },
    extend: {
      cursor: {
        default: 'url(/src/images/icons/cursor_mouse.svg), default',
      },

      fontSize: {
        '1.5xl': '1.375rem',
      },

      height: {
        '100': '25rem',
        '0.75': '0.1875rem',
        '5.5': '1.375rem',
      },

      gap: {
        '4.5': '1.125rem',
        '26.5': '6.625rem'
      },
    },
  },
  plugins: [],
}

