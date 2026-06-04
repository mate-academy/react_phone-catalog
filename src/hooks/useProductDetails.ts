import { useEffect, useState } from 'react';
import { ProductDetailsType } from '../types/product-details.types';
import { getProductDetails } from '../api';

interface UseProductDetailsResult {
  details: ProductDetailsType | null;
  loading: boolean;
  error: string;
}

export const useProductDetails = (
  productId: string | undefined,
): UseProductDetailsResult => {
  const [details, setDetails] = useState<ProductDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!productId) {
      setError('No product id');
      setLoading(false);

      return;
    }

    setDetails(null);
    setLoading(true);
    setError('');

    const loadDetails = async () => {
      try {
        const data = await getProductDetails(productId);

        setDetails(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [productId]);

  return { details, loading, error };
};
