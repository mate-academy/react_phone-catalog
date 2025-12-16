// src/data/hotPrice.ts
import hotGreenImg from '../assets/img/hot-green.png';
import hotGoldImg from '../assets/img/hot-gold.png';
import hotPurpleImg from '../assets/img/hot-purple.png';
import hotRedImg from '../assets/img/hot-red.png';

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

export const hotGreen: Product = {
  id: 'hotPhoneGreen',
  sku: 'H-MQ023',
  title: 'Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)',
  price: 'R$ 849',
  imageSrc: hotGreenImg,
  specs: { screen: '6.5" OLED', capacity: '512 GB', ram: '4 GB' },
};

export const hotGold: Product = {
  id: 'hotPhoneGold',
  sku: 'H-MQ083',
  title: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
  price: 'R$ 799',
  imageSrc: hotGoldImg,
  specs: { screen: '6.5" OLED', capacity: '64 GB', ram: '4 GB' },
};

export const hotPurple: Product = {
  id: 'hotPhonePurple',
  sku: 'H-MQ0G3',
  title: 'Apple iPhone 11 256GB Purple (iMT9G2FS/A)',
  price: 'R$ 729',
  imageSrc: hotPurpleImg,
  specs: { screen: '6.2" OLED', capacity: '256 GB', ram: '4 GB' },
};

export const hotRed: Product = {
  id: 'hotPhoneRed',
  sku: 'H-MQ513',
  title: 'Apple iPhone 11 128GB (Product) Red (iMT9G2FS/A)',
  price: 'R$ 699',
  imageSrc: hotRedImg,
  specs: { screen: '6.2" OLED', capacity: '128 GB', ram: '4 GB' },
};

// Bloco 2
export const phoneGreen: Product = {
  id: 'phoneGreen',
  sku: 'MQ777',
  title: 'Apple iPhone 14 Pro 128GB Green (MQ777)',
  price: 'R$ 899',
  imageSrc: phoneGreenImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const phoneBlack: Product = {
  id: 'phoneBlack',
  sku: 'MQ778',
  title: 'Apple iPhone 14 Pro 128GB Black (MQ778)',
  price: 'R$ 799',
  imageSrc: phoneBlackImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const phoneWhite: Product = {
  id: 'phoneWhite',
  sku: 'MQ779',
  title: 'Apple iPhone 14 Pro 128GB White (MQ779)',
  price: 'R$ 699',
  imageSrc: phoneWhiteImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const phoneYellow: Product = {
  id: 'phoneYellow',
  sku: 'MQ780',
  title: 'Apple iPhone 14 Pro 128GB Yellow (MQ780)',
  price: 'R$ 599',
  imageSrc: phoneYellowImg,
  specs: { screen: '6.1" OLED', capacity: '128 GB', ram: '6 GB' },
};

export const hotPrices: Product[] = [
  hotGreen,
  hotPurple,
  hotGold,
  hotRed,
  phoneGreen,
  phoneBlack,
  phoneWhite,
  phoneYellow,
];
