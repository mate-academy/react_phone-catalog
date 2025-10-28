import { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { api } from '../../../utils/api';

export const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<{
    totalProducts: number;
    foundById: boolean;
    foundByPhoneId: boolean;
    foundByItemId: boolean;
  } | null>(null);

  useEffect(() => {
    if (!productId) {
      setError('No product ID provided');
      setLoading(false);

      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        setDebugInfo(null);

        const allProducts = await api.getProducts();

        const foundById = allProducts.find(p => p.id === productId);
        const foundByPhoneId = allProducts.find(p => p.phoneId === productId);
        const foundByItemId = allProducts.find(p => p.itemId === productId);

        const foundProduct = foundById || foundByPhoneId || foundByItemId;

        setDebugInfo({
          totalProducts: allProducts.length,
          foundById: !!foundById,
          foundByPhoneId: !!foundByPhoneId,
          foundByItemId: !!foundByItemId,
        });

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError(
            `Product with ID "${productId}" not found. Available products: ${allProducts.length}`,
          );
        }
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error, debugInfo };
};
