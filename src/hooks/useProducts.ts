import { useState, useEffect } from 'react';

import { getProducts } from '../api';
import { ProductDetailsType } from '../types/product-details.types';
import { useErrorHandler } from '../utils/errors';

interface UseProductsResult {
  products: ProductDetailsType[];
  loading: boolean;
}

export const useProducts = (category?: string): UseProductsResult => {
  const [products, setProducts] = useState<ProductDetailsType[]>([]);
  const [loading, setLoading] = useState(false);

  const { handleError } = useErrorHandler();

  useEffect(() => {
    setLoading(true);

    getProducts(category)
      .then(data => {
        setProducts(data);
      })
      .catch(error => handleError('NETWORK', error))
      .finally(() => setLoading(false));
  }, [category, handleError]);

  return { products, loading };
};
