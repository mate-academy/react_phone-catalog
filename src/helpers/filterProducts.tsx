import { Product } from '../types/Product';

export const filterProducts = (products: Product[], query: string) => {
  const normalizedQuery = query.toLowerCase().trim();

  const productsIcludesQuery = products.filter(product => {
    const productName = product.name.toLowerCase();

    return productName.includes(normalizedQuery);
  });

  return productsIcludesQuery;
};
