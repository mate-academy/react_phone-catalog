/* eslint-disable max-len */
import { CategoryCard } from '../../types/Category';
import { getSliderWidth } from '../calc/helper';

export const URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
export const detailsURL = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export const categoryArray: CategoryCard[] = [
  {
    backImageUrl: 'img/category/phone-bg.png',
    imageUrl: 'img/category/phone.png',
    name: 'Mobile Phones',
    quantity: undefined,
    link: '/phones',
  },
  {
    backImageUrl: 'img/category/tablets-bg.png',
    imageUrl: 'img/category/tablets.png',
    name: 'Tablets',
    quantity: undefined,
    link: '/tablets',
  },
  {
    backImageUrl: 'img/category/accs-bg.png',
    imageUrl: 'img/category/accs.png',
    name: 'Accessories',
    quantity: undefined,
    link: '/accessories',
  },
];

export const animationString = 'translate .7s ease-in-out';
export const MainSiderimages: string[] = [
  '_new/img/banner-phones.png',
  '_new/img/banner-tablets.png',
  '_new/img/banner-accessories.png',
];
export const itemsPerSlide = 4;
export const itemWidth = 272;
export const itemMargin = 14;
export const sliderWidth = getSliderWidth(itemsPerSlide, itemWidth, itemMargin);

export const dropdownWidth = 150;
export const dropdownItemHeight = 41;
