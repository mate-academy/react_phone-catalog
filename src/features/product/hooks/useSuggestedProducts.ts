import { useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { getSuggestedProducts } from '@/shared/api/api';

export const useSuggestedProducts = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  useEffect(() => {
    getSuggestedProducts()
      .then(setSuggestedProducts)
      .catch(error =>
        console.error('Error fetching suggested products:', error),
      );
  }, []);
  return suggestedProducts;
};
