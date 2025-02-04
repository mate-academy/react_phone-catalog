import { Product } from '../types/Product';
import { useEffect, useState } from 'react';

export const useProducts = (errorCallback: () => void) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://irynamariiko00.github.io/react_phone-catalog/api/products.json',
        );
        const data = await response.json();

        await new Promise(resolve => setTimeout(resolve, 300));
        setProducts(data);
      } catch {
        errorCallback();
      }
    };

    fetchProducts();
  }, []);

  return { products };
};
