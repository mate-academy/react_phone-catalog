import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailedProduct } from '../hooks/products';
import { ProductDetails } from '../types/ProductDetails';

export const useDetailsProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    getDetailedProduct(productId)
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Something went wrong', error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return {
    product,
    setProduct,
    isLoading,
    setIsLoading,
    hasError,
    setHasError,
    productId,
  };
};
