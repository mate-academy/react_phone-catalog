import { CategoryType } from '../../shared/types/CategoryType';

export const categories: CategoryType[] = [
  {
    to: 'phones',
    img: './img/category-phones.webp',
    name: 'home_page.category_section.phones',
    bgColor: 'rgba(109, 100, 116, 1)',
    className: 'phones',
  },
  {
    to: 'tablets',
    img: './img/category-tablets.png',
    name: 'home_page.category_section.tablets',
    bgColor: 'rgba(141, 141, 146, 1)',
    className: 'tablets',
  },
  {
    to: 'accessories',
    img: './img/category-accessories.png',
    name: 'home_page.category_section.accessories',
    bgColor: 'rgba(151, 61, 95, 1)',
    className: 'accessories',
  },
];
