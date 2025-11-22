// src/data/products.ts
import phoneSilverImg from '../assets/img/phoneSilver.png';
import phonePurpleImg from '../assets/img/phonePurple.png';
import phoneGoldImg from '../assets/img/phoneGold.png';
import phoneRedImg from '../assets/img/phoneRed.png';

// novas imagens para o segundo bloco
import phoneGreenImg from '../assets/img/phones/apple-iphone-11/green/00.webp';
import phoneBlackImg from '../assets/img/phones/apple-iphone-11/black/00.webp';
import phoneWhiteImg from '../assets/img/phones/apple-iphone-11/White/00.webp';
import phoneYellowImg from '../assets/img/phones/apple-iphone-11/yellow/00.webp';

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

// Bloco 1
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
  price: 'R$ 859',
  imageSrc: phoneRedImg,
  specs: { screen: '6.7" OLED', capacity: '128 GB', ram: '6 GB' },
};

// Bloco 2
export const phoneGreen: Product = {
  id: 'phoneBlue',
  sku: 'MQ777',
  title: 'Apple iPhone 14 Pro 128GB Green (MQ777)',
  price: 'R$ 899',
  imageSrc: phoneGreenImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const phoneBlack: Product = {
  id: 'phoneGreen',
  sku: 'MQ778',
  title: 'Apple iPhone 14 Pro 128GB Black (MQ778)',
  price: 'R$ 799',
  imageSrc: phoneBlackImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const phoneWhite: Product = {
  id: 'phoneBlack',
  sku: 'MQ779',
  title: 'Apple iPhone 14 Pro 128GB White (MQ779)',
  price: 'R$ 699',
  imageSrc: phoneWhiteImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const phoneYellow: Product = {
  id: 'phoneWhite',
  sku: 'MQ780',
  title: 'Apple iPhone 14 Pro 128GB Yellow (MQ780)',
  price: 'R$ 599',
  imageSrc: phoneYellowImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

// Array final com 8 produtos (2 blocos de 4)
export const products: Product[] = [
  phoneSilver,
  phonePurple,
  phoneGold,
  phoneRed,
  phoneGreen,
  phoneBlack,
  phoneWhite,
  phoneYellow,
];
