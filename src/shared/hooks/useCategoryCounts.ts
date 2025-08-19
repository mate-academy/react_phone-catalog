import { useEffect, useState } from 'react';
import { BaseProduct, CategoryCount } from '../../types/Product/Product';
import { fetchApi } from '../api/fetchApi';

export const useCategoryCounts = () => {
  const [counts, setCounts] = useState<CategoryCount>({
    mobile: 0,
    tablets: 0,
    accessories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const countProductsByCategory = (
    phones: BaseProduct[],
    tablets: BaseProduct[],
    accessories: BaseProduct[],
  ): CategoryCount => {
    const phonesCount = phones.length;
    const tabletsCount = tablets.length;
    const accessoriesCount = accessories.length;

    return {
      mobile: phonesCount,
      tablets: tabletsCount,
      accessories: accessoriesCount,
    };
  };

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        setLoading(true);

        const [phones, tablets, accessories] = await Promise.all([
          fetchApi<BaseProduct[]>('/phones.json'),
          fetchApi<BaseProduct[]>('/tablets.json'),
          fetchApi<BaseProduct[]>('/accessories.json'),
        ]);

        const categoryCounts = countProductsByCategory(
          phones,
          tablets,
          accessories,
        );

        setCounts(categoryCounts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch products',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  return { counts, loading, error };
};
