import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { api } from '../../../utils/api';

export const useTablets = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        setLoading(true);

        const data = await api.getProductsByCategory('tablets');

        setTablets(data);
      } catch (err) {
        setError('Failed to load tablets');
      } finally {
        setLoading(false);
      }
    };

    fetchTablets();
  }, []);

  const refetch = () => {
    const fetchTablets = async () => {
      try {
        setLoading(true);

        const data = await api.getProductsByCategory('tablets');

        setTablets(data);
      } catch (err) {
        setError('Failed to load tablets');
      } finally {
        setLoading(false);
      }
    };

    fetchTablets();
  };

  return { tablets, loading, error, refetch };
};
