import { Product } from '../services/productType';

export enum Sort {
  alphabet = 'Alphabetically',
  newest = 'Newest',
  cheapest = 'Cheapest',
}

export function getSortedProducts(products: Product[], sortBy: Sort) {
  const preparedProducts = [...products];

  switch (sortBy) {
    case Sort.alphabet:
      preparedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case Sort.newest:
      preparedProducts.sort((a, b) => b.year - a.year);
      break;

    case Sort.cheapest:
      preparedProducts.sort((a, b) => a.price - b.price);
      break;

    default:
      break;
  }

  return preparedProducts;
}
