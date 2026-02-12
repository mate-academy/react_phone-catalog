import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

export const useProducts = (errorCallback: () => void) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/react_phone-catalog/api/products.json');
        const data = await response.json();

        await new Promise(resolve => setTimeout(resolve, 300));
        setProducts(data);
      } catch {
        errorCallback();
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return { products, isLoading };
};
