import { useEffect, useState } from 'react';

import { getProductDetails, getProducts } from '../api/products';
import { useAppSelector } from '../store/hooks';
import type {
  ProductCategory,
  ProductDetailsFromServer,
  ProductFromServer,
} from '../types/product';

type ProductDetailsList = ProductDetailsFromServer[];

export const useProductDetailsData = (category: ProductCategory | null) => {
  const language = useAppSelector(state => state.language.current);

  const [categoryProductsDetails, setCategoryProductsDetails] =
    useState<ProductDetailsList>([]);

  const [products, setProducts] = useState<ProductFromServer[]>([]);

  const [loadedCategory, setLoadedCategory] = useState<ProductCategory | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(Boolean(category));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!category) {
      setCategoryProductsDetails([]);
      setProducts([]);
      setLoadedCategory(null);
      setIsLoading(false);
      setHasError(false);

      return;
    }

    setIsLoading(true);
    setHasError(false);
    setLoadedCategory(null);
    setCategoryProductsDetails([]);
    setProducts([]);

    Promise.all([getProductDetails(category, language), getProducts(language)])
      .then(([detailsFromServer, productsFromServer]) => {
        setCategoryProductsDetails(detailsFromServer);
        setProducts(productsFromServer);
        setLoadedCategory(category);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category, language]);

  return {
    categoryProductsDetails,
    products,
    loadedCategory,
    isLoading,
    hasError,
  };
};
