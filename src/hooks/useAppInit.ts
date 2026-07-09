import { useState, useEffect, useMemo } from 'react';
import { Product } from '../types/Product';
import { CATEGORIES } from '../modules/shared/constants/categories';
import { getProducts } from '../modules/shared/services/productService';

export const useAppInit = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(fetchedProducts => {
        setProducts(fetchedProducts);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const categoriesWithCounts = useMemo(() => {
    return CATEGORIES.map(category => {
      const productsInCategory = products.filter(
        product => product.category === category.id,
      );

      return { ...category, count: productsInCategory.length };
    });
  }, [products]);

  return { products, categoriesWithCounts, isLoading, hasError };
};
