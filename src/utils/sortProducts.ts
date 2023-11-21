import { Product } from '../types/Product';
import { sortByName, sortByPrice, sortByYear } from './filterHelper';

export const sortProducts = (prducts: Product[], sortBy:string) => {
  switch (sortBy) {
    case 'Newest':
      return sortByYear(prducts);
    case 'Name':
      return sortByName(prducts);
    case 'Price':
      return sortByPrice(prducts);

    default:
      return prducts;
  }
};
