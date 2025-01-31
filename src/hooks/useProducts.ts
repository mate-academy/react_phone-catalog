import { Product } from '../types/Product';
import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return { products };
};
