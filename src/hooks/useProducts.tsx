import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { Product } from '../types/types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setProducts([]);
    setIsLoading(true);

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { products, isLoading };
};
