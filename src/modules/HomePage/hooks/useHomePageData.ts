import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { api } from '../../../utils/api';

interface UseHomePageDataReturn {
  hotPrices: Product[];
  newModels: Product[];
  loading: boolean;
  error: string | null;
}

export const useHomePageData = (): UseHomePageDataReturn => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await api.getProducts();

        // Hot prices - products with discount
        const hotPricesData = products
          .filter(product => product.fullPrice > product.price)
          .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
          .slice(0, 10);

        // New models
        const newModelsData = products
          .sort((a, b) => b.year - a.year)
          .slice(0, 10);

        setHotPrices(hotPricesData);
        setNewModels(newModelsData);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { hotPrices, newModels, loading, error };
};
