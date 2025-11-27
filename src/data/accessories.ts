// src/data/accessories.ts
export interface AccessoriesProduct {
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

import accessoriesGoldImg from '../assets/img/accessories/apple-watch-se/gold/00.webp';
import accessoriesSilverImg from '../assets/img/accessories/apple-watch-se/silver/00.webp';
import accessoriesSpaceImg from '../assets/img/accessories/apple-watch-se/space-gray/00.webp';
import accessoriesGrayImg from '../assets/img/accessories/apple-watch-series-3/space-gray/00.webp';

export const accessories: AccessoriesProduct[] = Array.from(
  { length: 42 },
  (_, i) => {
    const images = [
      accessoriesGoldImg,
      accessoriesSilverImg,
      accessoriesSpaceImg,
      accessoriesGrayImg,
    ];
    const colorNames = ['Gold', 'Silver', 'Space Gray', 'Green'];

    const colorIndex = i % images.length;

    return {
      id: `accessory-${i + 1}`,
      sku: `AC-${3000 + i}`,
      title: `Accessory ${colorNames[colorIndex]} (AC-${3000 + i})`,
      price: `R$ ${99 + (i % 5) * 20}`,
      imageSrc: images[colorIndex],
      specs: {
        screen: i % 2 === 0 ? '1.57" AMOLED' : '1.78" Retina',
        capacity: `${8 + (i % 3) * 8} GB`, // 8, 16, 24 GB
        ram: i % 2 === 0 ? '1 GB' : '2 GB',
      },
    };
  },
);
