import { Category, CategoryName } from '../../types/product';

export const categories: Category[] = [
  {
    id: 1,
    title: 'Mobile phones',
    img: 'img/categories/category-phones.png',
    category: CategoryName.phone,
  },
  {
    id: 2,
    title: 'Tablets',
    img: 'img/categories/category-tablets.png',
    category: CategoryName.tablet,
  },
  {
    id: 3,
    title: 'Accessories',
    img: 'img/categories/category-accessories.png',
    category: CategoryName.accessory,
  },
];
