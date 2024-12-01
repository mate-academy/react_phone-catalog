import { Category } from '../types/category';

interface Slide {
  url: string;
  urlMobile?: string;
  alt: string;
  category: Category;
  productId?: string;
  id: number;
}

export const useSlides = (): Slide[] => {
  const slides: Slide[] = [
    {
      url: 'img/banner-iphone-14-pro.png',
      urlMobile: 'img/banner-iphone-14-pro-mobile.png',
      alt: 'Iphone 14 pro',
      category: 'phones',
      productId: 'apple-iphone-14-pro-1tb-spaceblack',
      id: 0,
    },
    {
      url: 'img/banner-accessories.png',
      alt: 'Accessories',
      category: 'accessories',
      id: 1,
    },
    {
      url: 'img/banner-tablets.png',
      alt: 'Tablets',
      category: 'tablets',
      id: 2,
    },
  ];

  return slides;
};
