import { Product } from '../types/Product';

export const sortProductsByPrice = (products: Product[]) => {
  return products
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);
};

export const sortProductsByYear = (products: Product[]) => {
  return products.sort((a, b) => b.year - a.year).slice(0, 10);
};

export const upperCase = (lowerPath: string) => {
  return (
    lowerPath.charAt(0).toUpperCase() + lowerPath.slice(1, lowerPath.length)
  );
};

export function getBgColorForRadio(color: string) {
  switch (color) {
    case 'spacegray':
      return '#414143';
    case 'midnight':
      return '#191970';
    case 'rosegold':
      return '#efc8c1';
    case 'midnightgreen':
      return '#3d4640';
    default:
      return color;
  }
}

export const getRandomProducts = (arr: Product[], num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export const sortingOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Alphabetically', value: 'alphabetically' },
  { label: 'Cheapest', value: 'cheapest' },
];

export const itemsForPageOptions = [
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: 'All', value: 'all' },
];

export const techSpecs = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
];
