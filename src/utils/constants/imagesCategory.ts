import { ICategory } from '@utils/types/category.interface';

import product3 from '../../images/category/category-accessories.webp';
import product1 from '../../images/category/category-phones.webp';
import product2 from '../../images/category/category-tablets.webp';
import { ROUTES } from './routes';

export const CATEGORIES: ICategory[] = [
  {
    id: 1,
    category: 'phones',
    color: '#6d6474',
    img: product1,
    routes: ROUTES.PHONES,
    length: 0,
  },
  {
    id: 2,
    category: 'tablets',
    color: '#8D8D92',
    img: product2,
    routes: ROUTES.TABLETS,
    length: 0,
  },
  {
    id: 3,
    category: 'accessories',
    color: '#973D5F',
    img: product3,
    routes: ROUTES.ACCESSORIES,
    length: 0,
  },
];
