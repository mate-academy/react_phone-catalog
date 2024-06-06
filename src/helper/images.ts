import { BASE_URL_PHOTO } from './BASE_URL';

type Images = {
  img: string,
  alt: string,
};

export const bannerImages: Images[] = [
  { img: `${BASE_URL_PHOTO}/img/banner-accessories.png`, alt: 'Accessories' },
  { img: `${BASE_URL_PHOTO}/img/banner-phones.png`, alt: 'Phones' },
  { img: `${BASE_URL_PHOTO}/img/banner-tablets.png`, alt: 'Tablets' },
  { img: `${BASE_URL_PHOTO}/img/main-banner.png`, alt: 'Main' },
];

export const categoryImages: Images[] = [
  { img: `${BASE_URL_PHOTO}/img/category-phones.webp`, alt: 'Phones' },
  { img: `${BASE_URL_PHOTO}/img/category-tablets.webp`, alt: 'Tablets' },
  { img: `${BASE_URL_PHOTO}/img/category-accessories.webp`, alt: 'Accessories' },
];
