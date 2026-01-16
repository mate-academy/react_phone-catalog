import { createContext } from 'react';

export const categoriesArr = [
  {
    name: 'Phones',
    longName: 'Mobile phones',
    src: '/img/category-phones.png',
    slug: 'phones',
  },
  {
    name: 'Tablets',
    longName: 'Tablets',
    src: '/img/category-tablets.png',
    slug: 'tablets',
  },
  {
    name: 'Accessories',
    longName: 'Accessories',
    src: '/img/category-accessories.png',
    slug: 'accessories',
  },
];

export const CategoriesContext = createContext(categoriesArr);
