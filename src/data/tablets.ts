// src/data/tablets.ts
export interface TabletProduct {
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

// Reaproveitando imagens já existentes (depois você troca pelas corretas)
import tabletGoldImg from '../assets/img/tablets/apple-ipad-10-2-2020/gold/00.webp';
import tabletSilverImg from '../assets/img/tablets/apple-ipad-10-2-2020/silver/00.webp';
import tabletSpaceImg from '../assets/img/tablets/apple-ipad-10-2-2020/spacegray/00.webp';
import tabletGreenImg from '../assets/img/tablets/apple-ipad-air-4th-gen/green/00.webp';

// Criamos 42 produtos variando id, sku, título, preço e specs
export const tablets: TabletProduct[] = Array.from({ length: 42 }, (_, i) => {
  const colors = [
    tabletGoldImg,
    tabletSilverImg,
    tabletSpaceImg,
    tabletGreenImg,
  ];
  const colorNames = ['Green', 'Black', 'White', 'Yellow'];

  const colorIndex = i % colors.length;

  return {
    id: `tablet-${i + 1}`, // diferente de phone
    sku: `TB-${2000 + i}`, // prefixo TB para tablets
    title: `Apple iPad ${128 + (i % 3) * 128}GB ${colorNames[colorIndex]} (TB-${2000 + i})`,
    price: `R$ ${1999 + (i % 5) * 100}`, // preços variando, mais altos que phones
    imageSrc: colors[colorIndex],
    specs: {
      screen: i % 2 === 0 ? '10.2" Retina' : '12.9" Retina',
      capacity: `${128 + (i % 3) * 128} GB`,
      ram: i % 2 === 0 ? '4 GB' : '6 GB',
    },
  };
});
