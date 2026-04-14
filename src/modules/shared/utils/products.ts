import { Product } from '../../shared/types/Product';

export const getHotPrices = ({ products }: { products: Product[] }) => {
  return products
    .filter(p => p.fullPrice !== undefined)
    .sort((a, b) => {
      const discountA = a.fullPrice! - a.price;
      const discountB = b.fullPrice! - b.price;

      return discountB - discountA;
    });
};

export const getNewModels = (products: Product[]) => {
  return [...products]
    .filter(product => product !== undefined)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
};

export const getRandomProducts = (products: Product[]): Product[] => {
  return [...products].sort(() => Math.random() - 0.5);
};
