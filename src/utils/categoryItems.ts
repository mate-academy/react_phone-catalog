import { getAssetUrl } from '../api/utilis';

export const categoryItems = [
  {
    imgSrc: getAssetUrl('img/category-phones.webp'),
    label: 'Mobile phones',
    category: 'phones',
    alt: 'phone category',
    to: '/phones',
  },
  {
    imgSrc: getAssetUrl('img/category_tablets.png'),
    label: 'Tablets',
    category: 'tablets',
    alt: 'tablet category',
    to: '/tablets',
  },
  {
    imgSrc: getAssetUrl('img/category_accessories.png'),
    label: 'Accessories',
    category: 'accessories',
    alt: 'accessories category',
    to: '/accessories',
  },
];
