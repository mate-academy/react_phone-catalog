import { Product } from '../types/Product';
import { SortType } from '../types/Product';

export const getHotPriceProducts = (products: Product[]) => {
  return products.filter(product => product.price < product.fullPrice);
};

export const getProductsByCategory = (
  products: Product[],
  category: string,
) => {
  return products.filter(product => product.category === category);
};

export const getSortedProducts = (products: Product[], sortBy: SortType) => {
  const productsCopy = [...products];

  switch (sortBy) {
    case 'alphabetically':
      return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    case 'cheapest':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'newest':
    default:
      return productsCopy.sort((a, b) => b.year - a.year);
  }
};
