import { BASE_URL } from './BASE_URL';

type Images = {
  img: string,
  alt: string,
};

export const bannerImages: Images[] = [
  { img: `${BASE_URL}img/banner-accessories.png`, alt: 'Accessories' },
  { img: `${BASE_URL}img/banner-phones.png`, alt: 'Phones' },
  { img: `${BASE_URL}img/banner-tablets.png`, alt: 'Tablets' },
];

export const categoryImages: Images[] = [
  { img: `${BASE_URL}img/category-phones.png`, alt: 'Phones' },
  { img: `${BASE_URL}img/category-tablets.png`, alt: 'Tablets' },
  { img: `${BASE_URL}img/category-accessories.png`, alt: 'Accessories' },
];
