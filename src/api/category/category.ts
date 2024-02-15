import { Category, CategoryName } from '../../types/product';

export const categories: Category[] = [
  {
    id: 1,
    title: 'Mobile phones',
    img: '_new/img/category-phones.png',
    category: CategoryName.phone,
  },
  {

    id: 2,
    title: 'Tablets',
    img: '_new/img/category-tablets.png',
    category: CategoryName.tablet,
  },
  {
    id: 3,
    title: 'Accessories',
    img: '_new/img/category-accessories.png',
    category: CategoryName.accessory,
  },
];
