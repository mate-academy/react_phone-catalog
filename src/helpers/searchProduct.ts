import { Product } from '../types/Product';

export function searchProducts(
  query: string,
  products: Product[],
) {
  const lowerCaseSearchQuery = query.toLowerCase();
  const searchWords = lowerCaseSearchQuery
    .split(' ').filter(word => word.trim() !== '');

  const searcedProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();

    return searchWords.every(word => productName.includes(word));
  });

  return searcedProducts;
}
