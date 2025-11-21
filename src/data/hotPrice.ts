// src/data/hotPrice.ts
import hotGreenImg from '../assets/img/hot-green.png';
import hotGoldImg from '../assets/img/hot-gold.png';
import hotPurpleImg from '../assets/img/hot-purple.png';
import hotRedImg from '../assets/img/hot-red.png';

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

export const hotPrices: Product[] = [hotGreen, hotPurple, hotGold, hotRed];
