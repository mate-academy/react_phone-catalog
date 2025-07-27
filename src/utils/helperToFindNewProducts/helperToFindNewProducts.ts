import type { Product } from '../../types/products';

export const helperToFindNewProducts = (products: Product[]): Product[] => {
  const maxYear = Math.max(...products.map((product) => product.year));
  const newProducts = products.filter((product) => product.year === maxYear);

  const filteredAndSorted = newProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes('iphone 14') &&
        product.name.includes('128GB'),
    )
    .sort((a, b) => {
      const aIsPro = a.name.toLowerCase().includes('pro') ? 0 : 1;
      const bIsPro = b.name.toLowerCase().includes('pro') ? 0 : 1;
      return aIsPro - bIsPro;
    });

  return filteredAndSorted;
};
