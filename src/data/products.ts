// src/data/products.ts
import phoneSilverImg from '../assets/img/phoneSilver.png';
import phonePurpleImg from '../assets/img/phonePurple.png';
import phoneGoldImg from '../assets/img/phoneGold.png';
import phoneRedImg from '../assets/img/phoneRed.png';

export interface Product {
  id: string;
  sku?: string;
  title: string;
  price: string;
  imageSrc?: string;
  specs: {
    screen: string;
    capacity: string;
    ram: string;
  };
}

export const phoneSilver: Product = {
  id: 'phoneSilver',
  sku: 'MQ023',
  title: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
  price: 'R$ 999',
  imageSrc: phoneSilverImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const phonePurple: Product = {
  id: 'phonePurple',
  sku: 'MQ0G3',
  title: 'Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)',
  price: 'R$ 999',
  imageSrc: phonePurpleImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const phoneGold: Product = {
  id: 'phoneGold',
  sku: 'MQ083',
  title: 'Apple iPhone 14 Pro 128GB Gold (MQ083)',
  price: 'R$ 999',
  imageSrc: phoneGoldImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const phoneRed: Product = {
  id: 'phoneRed',
  sku: 'MQ513',
  title: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)',
  price: '$ 859',
  imageSrc: phoneRedImg,
  specs: { screen: '6.7" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const products: Product[] = [
  phoneSilver,
  phonePurple,
  phoneGold,
  phoneRed,
];
