import { useEffect, useState } from 'react';
import { getPhones, getTablets, getAccessories } from '../api/categories';

export const useCategories = () => {
  const [phonesCount, setPhonesCount] = useState(0);
  const [tabletsCount, setTabletsCount] = useState(0);
  const [accessoriesCount, setAccessoriesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [phones, tablets, accessories] = await Promise.all([
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);

        setPhonesCount(phones.length);
        setTabletsCount(tablets.length);
        setAccessoriesCount(accessories.length);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return { phonesCount, tabletsCount, accessoriesCount, loading, error };
};
