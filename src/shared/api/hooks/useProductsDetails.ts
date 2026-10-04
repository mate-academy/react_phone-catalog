import { useCallback, useEffect, useState } from 'react';

import { getProducts } from '@/shared/api/products';
import { type Category } from '@/shared/api/Category';
import { ProductDetails } from '@/shared/types/ProductDetails';

const cache: Partial<Record<Category, ProductDetails[]>> = {};

export const useProductsDetails = (category?: Category) => {
  const [products, setProducts] = useState<ProductDetails[]>(
    category ? cache[category] || [] : [],
  );

  const [isLoading, setIsLoading] = useState(
    category ? !cache[category] : false,
  );

  const [hasError, setHasError] = useState(false);

  const loadProducts = useCallback(async () => {
    if (!category) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getProducts<ProductDetails>(category);

      cache[category] = data;
      setProducts(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    if (!category) {
      return;
    }

    if (!cache[category]) {
      loadProducts();
    } else {
      setProducts(cache[category]);
    }
  }, [category, loadProducts]);

  return {
    products,
    isLoading,
    hasError,
    reload: loadProducts,
  };
};
