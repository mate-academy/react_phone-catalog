import { useState, useEffect } from 'react';
import { ProductDetails } from '../../../types';
import { api } from '../../../utils/api';

export const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setError('No product ID provided');
      setLoading(false);

      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.getProductDetails(productId);

        setProduct(data);

        if (!data) {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};
