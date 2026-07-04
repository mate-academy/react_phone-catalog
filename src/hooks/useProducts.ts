import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}/api/products.json`)
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  return { products };

  // console.log('BASE_URL:', import.meta.env.BASE_URL);
};
