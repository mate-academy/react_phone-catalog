// src/data/phones.ts
export interface PhoneProduct {
  id: string;
  sku?: string;
  title: string;
  price: string;
  imageSrc: string;
  specs: {
    screen: string;
    capacity: string;
    ram: string;
  };
}

// Reaproveitando imagens já existentes
import phoneGreenImg from '../assets/img/phones/apple-iphone-11/green/00.webp';
import phoneBlackImg from '../assets/img/phones/apple-iphone-11/black/00.webp';
import phoneWhiteImg from '../assets/img/phones/apple-iphone-11/white/00.webp';
import phoneYellowImg from '../assets/img/phones/apple-iphone-11/yellow/00.webp';

// Criamos 42 produtos variando id, sku, título, preço e specs
export const phones: PhoneProduct[] = Array.from({ length: 42 }, (_, i) => {
  const colors = [phoneGreenImg, phoneBlackImg, phoneWhiteImg, phoneYellowImg];
  const colorNames = ['Green', 'Black', 'White', 'Yellow'];

  const colorIndex = i % colors.length;

  return {
    id: `phone-${i + 1}`,
    sku: `PH-${1000 + i}`,
    title: `Apple iPhone 11 ${128 + (i % 3) * 128}GB ${colorNames[colorIndex]} (PH-${1000 + i})`,
    price: `R$ ${699 + (i % 5) * 50}`, // preços variando
    imageSrc: colors[colorIndex],
    specs: {
      screen: i % 2 === 0 ? '6.1" OLED' : '6.5" OLED',
      capacity: `${128 + (i % 3) * 128} GB`,
      ram: i % 2 === 0 ? '4 GB' : '6 GB',
    },
  };
});
