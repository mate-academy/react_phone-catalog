import React from 'react';
import { Phone } from './interfaces';

export const OWNER_GIT_HUB = 'https://github.com/vitaliikorol';

export const IMAGES_FOR_SLIDER = [
  "img/main_slider/1.jpg",
  "img/main_slider/2.png",
  "img/main_slider/3.jpg",
  "img/main_slider/4.jpg",
  "img/main_slider/5.jpg"
];

const PRODUCTS_API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
const downloadProducts = () => fetch(PRODUCTS_API_URL).then(response => response.json());


export const favGoods: Phone[] = [];
export const cartGoods: Phone[] = [];

export const ServerData = React.createContext(downloadProducts());
