import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-color-base-white': '#F1F2F9',
        'text-color-base-grey': '#75767F',
        'background-color-base': '#0F1121'
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-5%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily : {
        mont : ['Mont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
