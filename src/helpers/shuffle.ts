/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { Product } from '../types/Product';

export function shuffle(array: Product[] | null) {
  if (!array) {
    return [];
  }

  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
