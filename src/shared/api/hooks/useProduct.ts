import { useCallback, useEffect, useState } from 'react';
import { getProductById } from '@/shared/api/products';
import { ProductDetails } from '@/shared/types/ProductDetails';

const cache: Record<string, ProductDetails> = {};

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<ProductDetails | null>(
    id ? cache[id] || null : null,
  );

  const [isLoading, setIsLoading] = useState(id ? !cache[id] : false);

  const [hasError, setHasError] = useState(false);

  const loadProduct = useCallback(async () => {
    if (!id) {
      setIsLoading(false);

      return;
    }

    if (cache[id]) {
      setProduct(cache[id]);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getProductById<ProductDetails>(id);

      if (data) {
        cache[id] = data;
        setProduct(data);
      } else {
        setProduct(null);
      }
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return {
    product,
    isLoading,
    hasError,
    reload: loadProduct,
  };
};
