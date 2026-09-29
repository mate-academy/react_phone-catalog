import { useCallback, useEffect, useState } from 'react';
import { ProductDetails } from '@/shared/types';
import { getProductDetails } from '@/services/products';

export function useProductDetails(productId?: string, category?: string) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [hasErrorDetails, setHasErrorDetails] = useState(false);

  const loadData = useCallback(async () => {
    if (!productId || !category) {
      return;
    }

    setIsLoadingDetails(true);
    setHasErrorDetails(false);

    try {
      const products = await getProductDetails(category);
      const found = products.find(p => p.id === productId);

      if (found) {
        setProduct(found as unknown as ProductDetails);
      } else {
        setHasErrorDetails(true);
      }
    } catch {
      setHasErrorDetails(true);
    } finally {
      setIsLoadingDetails(false);
    }
  }, [productId, category]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    product,
    isLoadingDetails,
    hasErrorDetails,
    loadData,
  };
}
