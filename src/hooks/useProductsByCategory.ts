import { useEffect, useState } from 'react';
import { Product } from '../types/Product';

export const useProductsByCategory = (
  category: 'phones' | 'tablets' | 'accessories',
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch('/api/products.json');

        if (!response.ok) {
          throw new Error(
            `Failed to fetch products.json: ${response.status} ${response.statusText}`,
          );
        }

        const data: Product[] = await response.json();

        const filtered = data.filter(product => product.category === category);

        setProducts(filtered);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};
