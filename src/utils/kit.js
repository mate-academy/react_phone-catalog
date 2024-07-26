/* eslint-disable max-len */
import logo from '../assets/icons/Logo.svg';
import menu from '../assets/icons/Icons/Menu.svg';
import close from '../assets/icons/Close.svg';
import notFound from '../assets/product-not-found.png';

export const logoImg = logo;
export const menuImg = menu;
export const closeImg = close;
export const notFoundImg = notFound;

import sliderDescktop1 from '../assets/slider/descktop_1.png';
import sliderDescktop2 from '../assets/slider/descktop_2.png';
import sliderDescktop3 from '../assets/slider/descktop_3.png';

import sliderPhone1 from '../assets/slider/phone_1.png';
import sliderPhone2 from '../assets/slider/phone_2.png';
import sliderPhone3 from '../assets/slider/phone_3.png';

import phones from '../assets/categoryes/Phones.svg';
import tablets from '../assets/categoryes/Tablets.svg';
import accessories from '../assets/categoryes/Accessories.svg';

const sliderDescktop = [
  {
    id: 1,
    img: sliderDescktop1,
  },
  {
    id: 2,
    img: sliderDescktop2,
  },
  {
    id: 3,
    img: sliderDescktop3,
  },
];

const sliderPhone = [
  {
    id: 1,
    img: sliderPhone1,
  },
  {
    id: 2,
    img: sliderPhone2,
  },
  {
    id: 3,
    img: sliderPhone3,
  },
];

export const sliders = {
  descktop: sliderDescktop,
  phone: sliderPhone,
};

export const categories = [
  {
    id: 1,
    img: phones,
    href: 'phones',
    alt: 'phones',
    title: 'Mobile phones',
  },
  {
    id: 2,
    img: tablets,
    href: 'tablets',
    alt: 'tablets',
    title: 'Tablets',
  },
  {
    id: 3,
    img: accessories,
    href: 'accessories',
    alt: 'accessories',
    title: 'Accessories',
  },
];
