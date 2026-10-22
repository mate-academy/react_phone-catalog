import { useMemo } from 'react';
import type { ProductDetails } from '../types/ProductDetails';
import type { Product } from '../types/Product';

export const useSuggestedProducts = (
  product: ProductDetails | null,
  allProducts: Product[],
) => {
  const suggested = useMemo(() => {
    if (!product) {
      return [];
    }

    const sameCategory = allProducts.filter(
      item => item.category === product.category,
    );

    const closePrice = sameCategory.filter(
      item =>
        item.id !== product.id &&
        Math.abs(item.price - product.priceRegular) < 150,
    );

    return closePrice.slice(0, 12);
  }, [product, allProducts]);

  return {
    suggested,
    loadingSuggested: false,
  };
};
