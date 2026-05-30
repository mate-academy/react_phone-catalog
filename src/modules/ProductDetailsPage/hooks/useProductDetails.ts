import { useEffect, useState } from 'react';
import { ProductDetails } from '../../../types/Product';
import { getProductById } from '../../../api/products';

export const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!productId) {
      setProduct(null);

      return;
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const productData = await getProductById(productId);

        setProduct(productData ?? null);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  return { product, isLoading, errorMessage };
};
