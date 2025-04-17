import { useMemo } from 'react';

import { ProductCategory } from 'shared/constants/productCategory';
import { Product } from 'shared/types/Product';

export function useProductsByCategory(
  selectedCategory: ProductCategory,
  productsByCategory: Record<ProductCategory, Product[]>,
): Product[] {
  return useMemo(
    () => (selectedCategory ? productsByCategory[selectedCategory] : []),
    [selectedCategory, productsByCategory],
  );
}
