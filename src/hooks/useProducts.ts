import { Products } from '../types/Products';
import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return { products };
};
