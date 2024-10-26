import useMediaQuery from './useMediaQuery';

interface Slide {
  url: string;
  alt: string;
  id: number;
}

export const useSlides = (): [Slide[], boolean] => {
  const isMobile = useMediaQuery('(max-width: 639px)');

  const slides = [
    {
      url: isMobile
        ? '../../../../public/img/banner-iphone-14-pro-mobile.png'
        : '../../../../public/img/banner-iphone-14-pro.png',
      alt: 'Iphone 14 Pro',
      id: 0,
    },
    {
      url: '../../../../public/img/banner-accessories.png',
      alt: 'Accessories',
      id: 1,
    },
    {
      url: '../../../../public/img/banner-tablets.png',
      alt: 'Tablets',
      id: 2,
    },
  ];

  return [slides, isMobile];
};
