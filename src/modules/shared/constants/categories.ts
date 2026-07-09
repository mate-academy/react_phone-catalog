import { Category } from '../../../types/Category';

export const CATEGORIES: Category[] = [
  {
    id: 'phones',
    title: 'Mobile phones',
    navTitle: 'Phones',
    img: 'img/category-phones.webp',
    path: 'phones',
    banner: 'img/banner-phones.png',
    bannerAlt: 'Newest phones',
    count: 0,
  },
  {
    id: 'tablets',
    title: 'Tablets',
    img: 'img/category-tablets.webp',
    path: 'tablets',
    banner: 'img/banner-tablets.png',
    bannerAlt: 'Powerful tablets',
    count: 0,
  },
  {
    id: 'accessories',
    title: 'Accessories',
    img: 'img/category-accessories.webp',
    path: 'accessories',
    banner: 'img/banner-accessories.png',
    bannerAlt: 'Cool accessories',
    count: 0,
  },
];
