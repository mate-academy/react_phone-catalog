/* eslint-disable max-len */
import { CategoryCard } from '../../types/Category';
import { RouteTypes } from '../../types/RouteTypes';
import { getSliderWidth } from '../calc/helper';

export const URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';
export const detailsURL = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export const categoryArray: CategoryCard[] = [
  {
    backImageUrl: 'img/category/phone-bg.png',
    imageUrl: 'img/category/phone.png',
    name: 'Mobile Phones',
    quantity: undefined,
    link: RouteTypes.Phones,
  },
  {
    backImageUrl: 'img/category/tablets-bg.png',
    imageUrl: 'img/category/tablets.png',
    name: 'Tablets',
    quantity: undefined,
    link: RouteTypes.Tablets,
  },
  {
    backImageUrl: 'img/category/accs-bg.png',
    imageUrl: 'img/category/accs.png',
    name: 'Accessories',
    quantity: undefined,
    link: RouteTypes.Accessories,
  },
];

export const animationString = 'translate .7s ease-in-out';
export const MainSiderimages: string[] = [
  'img/banners/banner-phones.png',
  'img/banners/banner-tablets.png',
  'img/banners/banner-accessories.png',
];
export const itemsPerSlide = 4;
export const itemWidth = 272;
export const itemMargin = 14;
export const sliderWidth = getSliderWidth(itemsPerSlide, itemWidth, itemMargin);
export const slideWidth = 1040;

export const dropdownWidth = 150;
export const dropdownItemHeight = 41;
