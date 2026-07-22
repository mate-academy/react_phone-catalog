import { Product } from 'src/types/Product';

export const sortProducts = (
  products: Product[],
  sortBy: string,
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'price':
      return sorted.sort((a, b) => a.price - b.price);

    case 'age':
    default:
      return sorted.sort((a, b) => b.year - a.year);
  }
};

export const getNewestProducts = (products: Product[], limit = 15): Product[] =>
  [...products].sort((a, b) => b.year - a.year).slice(0, limit);

export const getDiscountedProducts = (products: Product[]): Product[] =>
  [...products].sort((a, b) => {
    const discountA = (a.fullPrice - a.price) / a.fullPrice;
    const discountB = (b.fullPrice - b.price) / b.fullPrice;

    return discountB - discountA;
  });
