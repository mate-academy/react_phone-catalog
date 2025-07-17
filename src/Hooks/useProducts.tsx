import { useEffect, useState } from 'react';
import { Data, getProductsByCategory } from '../utils/productsHelper';

export const useProducts = (category: string) => {
  const [pr, setPr] = useState<Data>({ isLoading: true, data: undefined });

  useEffect(() => {
    getProductsByCategory(category).then(([data]) => {
      setPr(() => ({ isLoading: data.isLoading, data: data.data }));
    });
  }, [category]);

  return pr;
};
