import type { Product } from '../types';

export const getVisibleProducts = (query: string, allProducts: Product[]) => {
  let visibleProducts: Product[] = [...allProducts];
  const normalizedQuery = query.trim().toLowerCase();

  if (query) {
    visibleProducts = visibleProducts.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery),
    );
  }

  return visibleProducts;
};
