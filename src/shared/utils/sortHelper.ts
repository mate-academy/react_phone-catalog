import { Product } from '../types/Product';

export const sortProducts = (products: Product[], sort: string | null) => {
  const sortedProducts = [...products];

  switch (sort) {
    case 'newest':
      return sortedProducts.sort((a, b) => b.year - a.year);
    case 'cheapest':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'alphabetically':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sortedProducts;
  }
};
