import { getProducts } from '@api/products';
import { Category } from '@shared/constants/categoryConfig';
import { useCallback, useEffect, useState } from 'react';
import { Product } from 'src/types/Product';

export const useFilteredProducts = (currentCategory: Category) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        const filtered = data.filter(
          product => product.category === currentCategory,
        );

        setProducts(filtered);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [currentCategory]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, isLoading, hasError, loadProducts };
};
