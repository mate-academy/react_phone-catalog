import { CategoryConfig } from '../types/category';

export const categories: CategoryConfig[] = [
  {
    key: 'phones',
    title: 'Mobile phones',
    link: '/phones',
    color: '#6D6474',
    image: '/img/category-phones.webp',
    height: '100%',
    transform: 'translate(20%, 10%)',
  },
  {
    key: 'tablets',
    title: 'Tablets',
    link: '/tablets',
    color: '#8D8D92',
    image: '/img/category-tablets.png',
    height: '140%',
    transform: 'translate(40%, 30%)',
  },
  {
    key: 'accessories',
    title: 'Accessories',
    link: '/accessories',
    color: '#D53C51',
    image: '/img/category-accessories.png',
    height: '60%',
    transform: 'translate(40%, 30%)',
  },
];
