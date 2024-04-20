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
        '126.5': '31.625rem',
        '100': '25rem',
        '13': '3.125rem',
        '5.5': '1.375rem',
        '0.75': '0.1875rem',
      },

      gap: {
        '26.5': '6.625rem',
        '4.5': '1.125rem',
      },

      width: {
        '68': '17rem',
        '53': '13.25rem',
        '3.5': '0.875rem',
      },

      maxWidth: {
        '116': '29rem',
      },
    },
  },
  plugins: [],
}

