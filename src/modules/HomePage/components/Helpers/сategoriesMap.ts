import { Category } from '../../../../types/Category';
import { BASE_URL } from '../../../../utils/constants';
import { PHONES, TABLETS, ACCESSORIES, HOME } from '../../../../utils/routes';

export const сategoriesMap = [
  {
    id: 1,
    srcImg: `${BASE_URL}img/phones-category.png`,
    title: 'Mobile phones',
    path: `${HOME}${PHONES}`,
    category: Category.PHONES,
  },
  {
    id: 2,
    srcImg: `${BASE_URL}img/tablets-category.png`,
    title: 'Tablets',
    path: `${HOME}${TABLETS}`,
    category: Category.TABLETS,
  },
  {
    id: 3,
    srcImg: `${BASE_URL}img/accessories-category.png`,
    title: 'Accessories',
    path: `${HOME}${ACCESSORIES}`,
    category: Category.ACCESSORIES,
  },
];
