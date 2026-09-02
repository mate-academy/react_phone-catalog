import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getPublicPath } from '../utils/getPublicPath';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getProducts() {
    try {
      setError(false);
      const response = await fetch(getPublicPath('/api/products.json'));

      if (!response.ok) {
        setError(true);
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      setProducts(data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return { products, loading, error, refetch: getProducts };
}
