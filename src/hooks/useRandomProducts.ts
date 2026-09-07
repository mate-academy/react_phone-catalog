import { useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';

export const useRandomProducts = (count: number = 4): Product[] => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('api/products.json');
      const data = await response.json();

      setAllProducts(data);
    };

    fetchData();
  }, []);

  return useMemo(() => {
    if (!allProducts || allProducts.length === 0) {
      return [];
    }

    const shuffled = [...allProducts].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count);
  }, [allProducts, count]);
};
