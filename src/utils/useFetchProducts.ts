import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from './api';

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const productsFromApi = await getProducts();

      setProducts(productsFromApi);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, error, isLoading, setIsLoading, fetchProducts };
};
