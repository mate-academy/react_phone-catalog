import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { useAppSelector } from '../store/hooks';
import type { ProductFromServer } from '../types/product';

export const useProducts = () => {
  const language = useAppSelector(state => state.language.current);

  const [products, setProducts] = useState<ProductFromServer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts(language)
      .then(setProducts)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [language]);

  return {
    products,
    isLoading,
    hasError,
  };
};
