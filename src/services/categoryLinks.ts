import { BASE_URL } from '../helpers/constants';
import { Categories } from '../types/Categories';

export const categoryLinks = [
  {
    name: 'Mobile phones',
    link: '/phones',
    img: `${BASE_URL}/img/category-phones.png`,
    background: '#fcd9c1',
    type: Categories.phones,
  }, {
    name: 'Tablets',
    link: '/tablets',
    img: '_new/img/category-tablets.png',
    background: '#8d8d92',
    type: Categories.tablets,
  }, {
    name: 'Accessories',
    link: '/accessories',
    img: '_new/img/category-accessories.png',
    background: '#973d5f',
    type: Categories.accessories,
  },
];
