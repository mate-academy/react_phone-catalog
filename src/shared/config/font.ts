import localFont from 'next/font/local';

export const mont = localFont({
  src: [
    {
      path: '../assets/fonts/Mont-Regular.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Mont-SemiBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Mont-Bold.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
  display: 'swap',
});
