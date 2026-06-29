import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ExtendedProduct } from '../types/ExtendedProduct';
import { fetchProductsByCategory } from '../services/getProductsFromAPI';
import { Category } from '../types/ProductCategory';

export const useExtendedProducts = () => {
  const { category, productId } = useParams();

  const [extendedProductsList, setExtendedProductsList] =
    useState<ExtendedProduct[]>();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!productId || !category) {
      return;
    }

    setIsLoading(true);
    setIsError(false);

    fetchProductsByCategory(category as Category)
      .then(products => setExtendedProductsList(products))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  return {
    isLoading,
    isError,
    extendedProductsList,
  };
};
