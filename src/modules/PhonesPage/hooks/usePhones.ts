import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { api } from '../../../utils/api';

export const usePhones = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);

        const data = await api.getProductsByCategory('phones');

        setPhones(data);
      } catch (err) {
        setError('Failed to load phones');
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  const refetch = () => {
    const fetchPhones = async () => {
      try {
        setLoading(true);

        const data = await api.getProductsByCategory('phones');

        setPhones(data);
      } catch (err) {
        setError('Failed to load phones');
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  };

  return { phones, loading, error, refetch };
};
