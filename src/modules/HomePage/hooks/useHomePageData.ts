import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { api } from '../../../utils/api';

export const useHomePageData = () => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [newModels, setNewModels] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const products = await api.getProducts();

        // Hot prices: products with discount, sorted by absolute discount value (biggest first)
        const hotPricesData = products
          .filter(product => product.fullPrice > product.price)
          .sort((a, b) => {
            const discountA = a.fullPrice - a.price;
            const discountB = b.fullPrice - b.price;

            return discountB - discountA; // Biggest discount first
          })
          .slice(0, 10);

        // Brand new models: sorted by year (newest first)
        const newModelsData = products
          .sort((a, b) => b.year - a.year) // Newest first
          .slice(0, 10);

        setHotPrices(hotPricesData);
        setNewModels(newModelsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { hotPrices, newModels, loading, error };
};
