/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '320px',
      md: '640px',
      'md-max': '768px',
      lg: '1200px',
      xl: '1440px',
    },
    colors: {
      'primary': '#313237',
      'secondary': '#89939a',
      'icons': '#b4bdc3',
      'elements': '#e2e6e9',
      'hover-bg': '#fafbfc',
      'hover-bs': '#17203166',
      'surface2': '#323542',
      'surface1': '#161827',
      'black': '#0f1121',
      'white': '#fff',
      'accent': '#e8e9ee',
      'green': '#27ae60',
      'red': '#eb5757',
    },
    boxShadow: {
      'inner': 'inset 0 0 0 1px',
      'left': '-1px 0 0 0',
      'right': '1px 0 0 0',
      'up': '0 -1px 0 0',
      'down': '0 1px 0 0',
    },
    fontFamily: {
      sans: ['Mont', 'sans-serif'],
    },
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
}
