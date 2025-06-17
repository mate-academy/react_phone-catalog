import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

export const useProduct = (errorCallback: () => void) => {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/react_phone-catalog/api/phones.json');
        const data = await response.json();

        await new Promise(resolve => setTimeout(resolve, 300));
        setProduct(data);
      } catch {
        errorCallback();
      }
    };

    fetchProduct();
  }, []);

  return { product };
};
