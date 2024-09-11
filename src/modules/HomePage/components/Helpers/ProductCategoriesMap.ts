import { BASE_URL } from '../../../../utils/constants';
import { PHONES, TABLETS, ACCESSORIES, HOME } from '../../../../utils/routes';

export const ProductCategoriesMap = [
  {
    id: 1,
    srcImg: `${BASE_URL}img/phones-category.png`,
    title: 'Mobile phones',
    path: `${HOME}${PHONES}`,
  },
  {
    id: 2,
    srcImg: `${BASE_URL}img/tablets-category.png`,
    title: 'Tablets',
    path: `${HOME}${TABLETS}`,
  },
  {
    id: 3,
    srcImg: `${BASE_URL}img/accessories-category.png`,
    title: 'Accessories',
    path: `${HOME}${ACCESSORIES}`,
  },
];
