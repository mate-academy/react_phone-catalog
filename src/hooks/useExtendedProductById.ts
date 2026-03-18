import { useParams } from 'react-router-dom';
import { useExtendedProducts } from './useExtendedProducts';
import { useMemo } from 'react';

export const useExtendedProductById = () => {
  const { extendedProductsList, isLoading, isError } = useExtendedProducts();
  const { productId } = useParams();

  const product = useMemo(() => {
    if (!productId || !extendedProductsList) {
      return null;
    }

    return extendedProductsList.find(p => p.id === productId) || null;
  }, [extendedProductsList, productId]);

  return {
    extendedProductsList,
    product,
    isLoading,
    isError,
  };
};
