import { useEffect, useRef, useState } from 'react';
import { getProductDetails } from '@api/products';
import { ProductDetails } from 'src/types/ProductDetails';

export const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isChangingVariant, setIsChangingVariant] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setIsInitialLoading(true);
      isFirstRender.current = false;
    } else {
      setIsChangingVariant(true);
    }

    setHasError(false);

    getProductDetails(productId)
      .then(setProduct)
      .catch(() => setHasError(true))
      .finally(() => {
        setIsInitialLoading(false);
        setIsChangingVariant(false);
      });
  }, [productId]);

  return { product, isInitialLoading, isChangingVariant, hasError };
};
