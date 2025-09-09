import prod1 from '../assets/images/mobi1.png';
import prod2 from '../assets/images/mobi2.png';
import prod3 from '../assets/images/mobi3.png';
import prod4 from '../assets/images/mobi4.png';

import img1 from '../assets/images/productImage1.png';
import img2 from '../assets/images/productImage2.png';
import img3 from '../assets/images/productImage3.png';
import img4 from '../assets/images/productImage4.png';
import img5 from '../assets/images/productImage5.png';

export const baseProducts = [
  {
    id: 802389,
    originalId: 802389,
    image: prod1,
    images: [prod1, img2, img3, img4, img5],
    title: 'Apple iPhone Xs 64GB Silver (iMT9G2FS/A)',
    price: 799,
    oldPrice: 899,
    colors: ['#FCDBC1', '#5F7170', '#4C4C4C', '#F0F0F0'], // цвета
    memory: ['64 GB', '128 GB', '256 GB'], // память
    baseSpecs: [
      { left: 'screen', right: '5.8” OLED' },
      { left: 'capacity', right: '64 GB' },
      { left: 'ram', right: '4 GB' },
    ],
    fullSpecs: [
      { left: 'screen', right: '6.5” OLED' },
      { left: 'resolution', right: '2688x1242' },
      { left: 'processor', right: 'Apple A12 Bionic' },
      { left: 'ram', right: '3 GB' },
    ],
  },
  {
    id: 802390,
    originalId: 802390,
    image: prod2,
    images: [img1, img2, img3, img4, img5],
    title: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
    price: 799,
    oldPrice: 1199,
    colors: ['#FCDBC1', '#5F7170', '#4C4C4C', '#F0F0F0'], // цвета
    memory: ['64 GB', '256 GB', '512 GB'], // память
    baseSpecs: [
      // <- для каталога и рекомендаций
      { left: 'screen', right: '6.5” OLED' },
      { left: 'capacity', right: '64 GB' },
      { left: 'ram', right: '4 GB' },
    ],
    fullSpecs: [
      { left: 'screen', right: '6.5” OLED' },
      { left: 'resolution', right: '2688x1242' },
      { left: 'processor', right: 'Apple A12 Bionic' },
      { left: 'ram', right: '3 GB' },
    ],
  },
  {
    id: 802391,
    originalId: 802391,
    image: prod3,
    images: [prod3, img2, img3, img4, img5],
    title: 'Apple iPhone 11 128GB Purple (iMT9G2FS/A)',
    price: 799,
    oldPrice: 899,
    colors: ['#FCDBC1', '#5F7170', '#4C4C4C'], // цвета
    memory: ['64 GB', '128 GB', '256 GB'], // память
    baseSpecs: [
      { left: 'screen', right: '6.2” IPS' },
      { left: 'capacity', right: '128 GB' },
      { left: 'ram', right: '4 GB' },
    ],
    fullSpecs: [
      { left: 'screen', right: '6.5” OLED' },
      { left: 'resolution', right: '2688x1242' },
      { left: 'processor', right: 'Apple A12 Bionic' },
      { left: 'ram', right: '3 GB' },
    ],
  },
  {
    id: 802392,
    originalId: 802392,
    image: prod4,
    images: [prod4, img2, img3, img4, img5],
    title: 'Apple iPhone X 256GB Silver (iMT9G2FS/A)',
    price: 859,
    oldPrice: 899,
    colors: ['#FCDBC1', '#5F7170', '#4C4C4C'], // цвета
    memory: ['64 GB', '128 GB', '256 GB'], // память
    baseSpecs: [
      { left: 'screen', right: '5.8” OLED' },
      { left: 'capacity', right: '256 GB' },
      { left: 'ram', right: '3 GB' },
    ],
    fullSpecs: [
      { left: 'screen', right: '6.5” OLED' },
      { left: 'resolution', right: '2688x1242' },
      { left: 'processor', right: 'Apple A12 Bionic' },
      { left: 'ram', right: '3 GB' },
    ],
  },
];

import prod11 from '../assets/images/product1.png';
import prod21 from '../assets/images/product2.png';
import prod31 from '../assets/images/product3.png';
import prod41 from '../assets/images/product4.png';
import prod51 from '../assets/images/product5.png';
import prod6 from '../assets/images/product6.png';
import prod7 from '../assets/images/product7.png';
import prod8 from '../assets/images/product8.png';

export const brandNewProducts = [
  {
    image: prod11,
    id: '802393-brandNew',
    originalId: 802393,
    title: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
    price: '$999',
    specs: [
      { left: 'screen', right: '6.1” OLED' },
      { left: 'capacity', right: '128 GB' },
      { left: 'ram', right: '6 GB' },
    ],
  },
  {
    image: prod21,
    id: '802394-brandNew',
    originalId: 802394,
    title: 'Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)',
    price: '$999',
    specs: [
      { left: 'screen', right: '6.1” OLED' },
      { left: 'capacity', right: '128 GB' },
      { left: 'ram', right: '6 GB' },
    ],
  },
  {
    image: prod31,
    id: '802395-brandNew',
    originalId: 802395,
    title: 'Apple iPhone 14 Pro 128GB Gold (MQ083)',
    price: '$999',
    specs: [
      { left: 'screen', right: '6.1” OLED' },
      { left: 'capacity', right: '128 GB' },
      { left: 'ram', right: '6 GB' },
    ],
  },
  {
    image: prod41,
    id: '802396-brandNew',
    originalId: 802396,
    title: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)',
    price: '$859',
    specs: [
      { left: 'screen', right: '6.7” OLED' },
      { left: 'capacity', right: '128 GB' },
      { left: 'ram', right: '6 GB' },
    ],
  },
];

export const hotPricesProducts = [
  {
    image: prod51,
    id: '802397-hot',
    originalId: 802397,
    title: 'Apple iPhone X Pro 512GB',
    price: '$849',
    oldPrice: '$1199',
    specs: [
      { left: 'screen', right: '6.5” OLED' },
      { left: 'capacity', right: '512 GB' },
      { left: 'ram', right: '4 GB' },
    ],
  },
  {
    image: prod6,
    id: '802398-hot',
    originalId: 802398,
    title: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
    price: '$799',
    oldPrice: '$999',
    specs: [
      { left: 'screen', right: '6.5” OLED' },
      { left: 'capacity', right: '64 GB' },
      { left: 'ram', right: '4 GB' },
    ],
  },
  {
    image: prod7,
    id: '802399-hot',
    originalId: 802399,
    title: 'Apple iPhone 11 256GB Purple (iMT9G2FS/A)',
    price: '$729',
    oldPrice: '$859',
    specs: [
      { left: 'screen', right: '6.2” IPS' },
      { left: 'capacity', right: '256 GB' },
      { left: 'ram', right: '4 GB' },
    ],
  },
  {
    image: prod8,
    id: '802400-hot',
    originalId: 802400,
    title: 'Apple iPhone 11 128GB (Product) Red (iMT9G2FS/A)',
    price: '$699',
    oldPrice: '$899',
    specs: [
      { left: 'screen', right: '6.2” IPS' },
      { left: 'capacity', right: '128 GB' },
      { left: 'ram', right: '4 GB' },
    ],
  },
];
