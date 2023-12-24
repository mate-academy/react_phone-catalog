import { Item } from '../types/Item';
import { Sort } from '../types/others/types';

export const getSortedProducts
= (products: Item[], sortType: Sort) => {
  switch (sortType) {
    case 'age':
      return products.sort((a, b) => a.age - b.age);
    case 'price':
      return products.sort((a, b) => a.price - b.price);
    case '-price':
      return products.sort((a, b) => b.price - a.price);
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    default: return products;
  }
};
