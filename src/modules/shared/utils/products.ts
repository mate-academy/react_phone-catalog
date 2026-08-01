import { Product } from '@shared/types';

export const filterProductsByQuery = (
  products: Product[],
  query: string,
): Product[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return products;
  }

  return products.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery),
  );
};
