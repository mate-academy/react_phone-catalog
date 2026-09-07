import { PictureSlideData } from '../types';

export const heroSliderItems: PictureSlideData[] = [
  {
    title: 'New iPhone 14 Pro: Premium Style',
    description: 'Experience the future today!',
    img: 'img/home/slider/00.png',
    alt: 'iphone 14 pro',
    navigateTo: '/phones',
  },
  {
    title: 'iPad Air 5: Unlock New Possibilities',
    description: 'Lightweight, powerful, elegant!',
    img: 'img/home/slider/01.png',
    alt: 'ipad air 5th generation',
    navigateTo: '/tablets',
  },
  {
    title: 'Apple Watch Ultra: Always There',
    description: 'Designed for an active lifestyle!',
    img: 'img/home/slider/02.png',
    alt: 'apple watch ultra, series 8, se',
    navigateTo: '/accessories',
  },
] as const;
