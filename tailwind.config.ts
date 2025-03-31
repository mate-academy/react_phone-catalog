import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-color-base-white': '#F1F2F9',
        'text-color-base-grey': '#75767F',
        'background-color-base': '#0F1121',
        'background-color-btn': '#323542'
      },
      animation: {
        fade: 'fadeIn 0.7s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      fontFamily : {
        mont : ['Mont', 'sans-serif'],
      },
      letterSpacing : {
        'negative-1': '-0.01em',
      },
    },
  },
  plugins: [],
};

export default config;
