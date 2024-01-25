import { Product } from '../type/Product';

export function filterProducts(products: Product[]): Product[] {
  return products.sort((a, b) => b.price - a.price);
}

export function sortProductsByNewest(products: Product[]): Product[] {
  return [...products].sort((a, b) => b.year - a.year);
}

export function getHotPriceProducts(products: Product[]): Product[] {
  const hotPriceProducts = products
    .filter(product => product.price > 0)
    .sort((a, b) => Math.abs(a.price * (
      a.price / 100)) - Math.abs(b.price * (b.price / 100)));

  return hotPriceProducts;
}

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getProductById = (products: Product[], id: string) => {
  return products.find(product => product.itemId === id);
};

export const PRODUCTS_COLORS: { [color:string]: string } = {
  black: '#4C4C4C',
  rosegold: '#FED0C6',
  gold: '#FCDBC1',
  silver: '#F0F0EE',
  spacegray: '#8D8D92',
  green: '#A3EACC',
  yellow: '#FEE870',
  white: '#F0F0F0',
  purple: '#EDE1F9',
  red: '#C91C38',
  coral: '#FF7F50',
  midnightgreen: '#5F7170',
};
