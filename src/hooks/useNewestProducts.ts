import { useEffect, useMemo, useState } from 'react';
import { Product } from '../types/Product';

export const useNewestProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products.json');
        const data = await response.json();

        setAllProducts(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const newestProducts = useMemo(() => {
    return [...allProducts].sort((a, b) => b.year - a.year).slice(0, 10);
  }, [allProducts]);

  return {
    newestProducts,
    loading,
    error,
  };
};
