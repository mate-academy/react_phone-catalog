import product1 from '../../images/category/category-phones.png';
import product2 from '../../images/category/category-tablets.png';
import product3 from '../../images/category/category-accessories.png';
import { ROUTES } from './routes';

export const CATEGORY = [
  {
    id: 1,
    name: 'Mobile phones',
    category: 'Category mobile phones',
    color: '#6d6474',
    img: product1,
    routes: ROUTES.PHONES,
    length: 0,
  },
  {
    id: 2,
    name: 'Tablets',
    category: 'Category Tablets',
    color: '#8D8D92',
    img: product2,
    routes: ROUTES.TABLETS,
    length: 0,
  },
  {
    id: 3,
    name: 'Accessories',
    category: 'Category Accessories',
    color: '#973D5F',
    img: product3,
    routes: ROUTES.ACCESSORIES,
    length: 0,
  },
];
