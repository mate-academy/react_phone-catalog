import { Category } from '../../../types';
import { CategoryItem } from '../types/CategoryItem';

export const categoryItems: CategoryItem[] = [
  {
    img: 'img/home/categories/category-phones.png',
    alt: 'Phones',
    navigateTo: '/phones',
    title: 'Mobile phones',
    background: 'linear-gradient(180deg, #453F4B 0%, #A093A5 100%)',
    category: Category.Phones,
  },
  {
    img: 'img/home/categories/category-tablets.webp',
    alt: 'Tablets',
    navigateTo: '/tablets',
    title: 'Tablets',
    background: 'linear-gradient(180deg, #587788 0%, #9DC1D0 100%)',
    category: Category.Tablets,
  },
  {
    img: 'img/home/categories/category-accessories.png',
    alt: 'Accessories',
    navigateTo: '/accessories',
    title: 'Accessories',
    background: 'linear-gradient(180deg, #EE5715 0%, #DB8347 100%)',
    category: Category.Accessories,
  },
] as const;
