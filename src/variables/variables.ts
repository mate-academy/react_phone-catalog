import { CategoryType } from '../types/CategoryType';
import { Colors } from '../types/Colors';
import { ImageOnHomePage } from '../types/ImageOnHomePage';

export const imagesForSlider: ImageOnHomePage[] = [
  {
    id: 1,
    name: 'phones',
    imageUrl:
      '../_new/img/banner-phones.png',
  },
  {
    id: 2,
    name: 'tablets',
    imageUrl:
      '../_new/img/banner-tablets.png',
  },
  {
    id: 3,
    name: 'cabels',
    imageUrl:
      '../_new/img/picthree.bdd2e0fc.png',
  },
  {
    id: 4,
    name: 'accessories',
    imageUrl:
      '../_new/img/new-banner-1.jpg',
  },
  {
    id: 5,
    name: 'accessories',
    imageUrl:
      '../_new/img/new-banner-2.jpg',
  },
  {
    id: 6,
    name: 'accessories',
    imageUrl:
      '../_new/img/new-banner-3.jpg',
  },
];

export const beautyColors: Colors = {
  silver: '#e9ebea',
  gold: '#eee1c6',
  midnightgreen: '#47534d',
  spacegray: '#696863',
  red: '#e03547',
  purple: '#e1d9ee',
  white: '#eae5df',
  yellow: '#fbe580',
  black: '#2b2b2b',
  green: '#b4e9cf',
};

export const categories: CategoryType[] = [
  {
    id: 1,
    name: 'Mobile phones',
    type: 'phones',
    imageUrl:
      '../_new/img/category-phones.png',
    imageBackground: '#fcdbc1',
  },
  {
    id: 2,
    name: 'Tablets',
    type: 'tablets',
    imageUrl:
      '../_new/img/category-tablets.png',
    imageBackground: '#8d8d92',
  },
  {
    id: 3,
    name: 'Accessories',
    type: 'accessories',
    imageUrl:
      '../_new/img/category-accessories.png',
    imageBackground: '#973d5f',
  },
];
