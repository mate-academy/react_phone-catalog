import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-color-base-white': '#F1F2F9',
        'text-color-base-grey': '#75767F',
        'background-color-base': '#0F1121',
        'background-color-btn': '#323542',
        'background-color-btn-hover': '#4A4D58',
        'color-border': '#3B3E4A',
        'color-btn-purple': '#905BFF',
        'color-btn-purple-hover': '#A378FF',
        'color-btn-pagin': '#161827',
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
      fontFamily: {
        mont: ['Mont', 'sans-serif'],
      },
      letterSpacing: {
        'negative-1': '-0.01em',
        '4pct': '0.04em',
      },
    },
  },
  plugins: [],
};

export default config;
