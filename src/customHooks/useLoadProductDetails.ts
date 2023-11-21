import { useEffect, useState } from 'react';
import { ProductDetails } from '../types/ProductDetails';
import { getProductDetails } from '../services/getProductDetails';
import { scrollToTop } from '../services/scrollToTop';

export function useLoadProductDetails(itemId: string) {
  const [
    isLoadingProductDetails,
    setIsLoadngDetails,
  ] = useState(true);

  const [
    productDetails,
    setProductDetails,
  ] = useState<ProductDetails | null>(null);

  const [
    productDetailsErrorMessage,
    setProductDetailsErrorMessage,
  ] = useState('');

  const loadProductDetails = async () => {
    try {
      setProductDetails(null);
      setIsLoadngDetails(true);
      const productDetailsFromServer = await getProductDetails(itemId);

      setProductDetails(productDetailsFromServer);
    } catch {
      setProductDetailsErrorMessage(
        'Error occured while loading product details',
      );
    } finally {
      setIsLoadngDetails(false);
    }
  };

  useEffect(() => {
    loadProductDetails();

    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [itemId]);

  return [
    isLoadingProductDetails,
    productDetails,
    productDetailsErrorMessage,
    setProductDetailsErrorMessage,
  ] as const;
}
