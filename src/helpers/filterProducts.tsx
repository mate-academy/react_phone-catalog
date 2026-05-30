import { Product } from '../types/Product';

export const filterProducts = (products: Product[], query: string) => {
  const queryWords = query.toLowerCase().trim().split(' ');

  const filteredProducts = products.filter(product => {
    const productName = product.name.toLowerCase();

    return queryWords.some(word => productName.includes(word));
  });

  return filteredProducts;
};
