/* eslint-disable max-len */
import { Product } from '../types/Product';

export function SortProducts(products: Product[], sort: string, query?: string) {
  let sortedProducts: Product[] = [];

  switch (sort) {
    case 'age':
      sortedProducts = [...products]
        .sort((a, b) => b.year - a.year);
      break;

    case 'name':
      sortedProducts = [...products]
        .sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'price':
      sortedProducts = [...products]
        .sort((a, b) => b.price - a.price);
      break;

    default:
      sortedProducts = products;
  }

  if (query) {
    const queryArray = query.toLowerCase().split(' ');

    sortedProducts = sortedProducts
      .filter((p) => queryArray
        .every((qValue) => p.name.toLowerCase().includes(qValue)));
  }

  return sortedProducts;
}
