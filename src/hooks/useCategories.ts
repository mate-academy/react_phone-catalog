import { Category } from '../types/category';

export interface Categories {
  category: Category;
  title: string;
  color: string;
  url: string;
  alt: string;
  id: number;
}

export const useCategories = (): Categories[] => {
  const categories: Categories[] = [
    {
      category: 'phones',
      title: 'Mobile phones',
      color: '#6d6474',
      url: '/img/category-phones.png',
      alt: 'Phones category',
      id: 0,
    },

    {
      category: 'tablets',
      title: 'Tablets',
      color: 'rgb(140, 140, 145)',
      url: '/img/category-tablets.png',
      alt: 'Tablets category',
      id: 1,
    },

    {
      category: 'accessories',
      title: 'Accessories',
      color: 'rgb(172, 56, 94)',
      url: '/img/category-accessories.png',
      alt: 'Accessories category',
      id: 2,
    },
  ];

  return categories;
};
