import { ROUTES } from '@/constants/routes';
import { CategoryUI } from '../types/CategoryUI';

export const categories: CategoryUI[] = [
  {
    title: 'Mobile phones',
    type: 'phones',
    preview: 'img/category-phones.webp',
    path: ROUTES.PHONES,
  },
  {
    title: 'Tablets',
    type: 'tablets',
    preview: 'img/category-tablets.webp',
    path: ROUTES.TABLETS,
  },
  {
    title: 'Accessories',
    type: 'accessories',
    preview: 'img/category-accessories.webp',
    path: ROUTES.ACCESSORIES,
  },
];
