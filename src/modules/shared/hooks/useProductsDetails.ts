import { useEffect, useState, useCallback } from 'react';
import { ProductDetails } from '../types/ProductDetails';
import { getProductDetails } from '../api/products';

type Result = {
  product: ProductDetails | null;
  numericId: number | null;
  isLoading: boolean;
  hasError: boolean;
  notFound: boolean;
  reload: () => void;
};

export const useProductDetails = (productId: string): Result => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [numericId, setNumericId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setNotFound(false);
    setProduct(null);

    getProductDetails(productId)
      .then(result => {
        if (!result) {
          setNotFound(true);

          return;
        }

        setProduct(result.details);
        setNumericId(result.numericId);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  return { product, numericId, isLoading, hasError, notFound, reload: load };
};
