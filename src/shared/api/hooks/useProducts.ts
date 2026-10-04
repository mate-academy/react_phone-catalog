import { useCallback, useEffect, useState } from 'react';

import { getProducts } from '@/shared/api/products';
import { type Category } from '@/shared/api/Category';
import { Product } from '@/shared/types/Product';
import { ProductDetails } from '@/shared/types/ProductDetails';
import { mapProductDetails } from '@/shared/utils/mapProductDetails';

const cache: Partial<Record<Category, Product[]>> = {};

export const useProducts = (category?: Category) => {
  const [products, setProducts] = useState<Product[]>(
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

      const mappedProducts = data.map(mapProductDetails);

      cache[category] = mappedProducts;
      setProducts(mappedProducts);
    } catch (error) {
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
