/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        desktop: 'minmax(152px, auto) repeat(12, 80px) minmax(152px, auto)',
      },
      gridTemplateRows: {
        spread: 'auto 1fr auto',
      },
      colors: {
        current: 'currentColor',
        Background: '#FAFBFC',
        Secondary: '#89939A',
        Elements: '#E2E6E9',
        Primary: '#313237',
        Icons: '#B4BDC3',
        Green: '#27AE60',
        Red: '#EB5757',
      },
      fontFamily: {
        Mont: ['Mont', 'helvetica'],
      },
      boxShadow: {
        px: '1px 0px 0px 0px #E2E6E9',
        test: '0px 0px 0px 3px red',
        'button-hover': '0px 3px 13px 0px',
      },
      backgroundPosition: {
        categoryBanner: 'left 73px top 32px',
      },
    },
  },
  plugins: [],
};
