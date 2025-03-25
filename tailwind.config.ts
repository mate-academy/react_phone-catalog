import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'text-color-base': '#F1F2F9',
        'background-color-base': '#0F1121'
      }
    },
  },
  plugins: [],
};

export default config;
