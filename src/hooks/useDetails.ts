/* eslint-disable import/extensions */
import { ProductDetailed } from '@/types/ProductDetailed';
import { useEffect, useState } from 'react';

export const useDetails = (category: string, itemId: string) => {
  const [productDetails, setProductDetails] = useState<ProductDetailed>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const response = await fetch(`api/${category}.json`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const categoryProducts = await response.json();

        const product = categoryProducts.find(
          (p: ProductDetailed) => p.id === itemId,
        );

        if (!product) {
          return;
        }

        setProductDetails(product);
      } catch (err) {
        setError('Failed to load details. Please try again');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [category, itemId]);

  return { productDetails, detailsLoading: loading, detailsError: error };
};
