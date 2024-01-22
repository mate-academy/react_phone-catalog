import { Product } from '../types/Product';
import {
  CARDS_PER_PAGE_DESKTOP,
  CARDS_PER_PAGE_MOBILE,
  CARDS_PER_PAGE_TABLET,
  MIN_WIDTH_DESKTOP,
  MIN_WIDTH_MOBILE,
  MIN_WIDTH_TABLET,
} from './constants';

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
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

export const getCardsPerPage = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth < MIN_WIDTH_DESKTOP) {
    if (windowWidth < MIN_WIDTH_TABLET) {
      if (windowWidth < MIN_WIDTH_MOBILE) {
        return CARDS_PER_PAGE_MOBILE;
      }

      return CARDS_PER_PAGE_TABLET;
    }

    return CARDS_PER_PAGE_TABLET;
  }

  return CARDS_PER_PAGE_DESKTOP;
};
