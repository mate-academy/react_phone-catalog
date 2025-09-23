import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { api } from '../../../utils/api';

export const useAccessories = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        const data = await api.getProductsByCategory('accessories');

        setAccessories(data);
      } catch (err) {
        setError('Failed to load accessories');
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  return { accessories, loading, error };
};
