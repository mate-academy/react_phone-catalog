import { useEffect, useState } from 'react';
import { Category, ProductDetails } from '../../../types/Product';
import { getProductById } from '../../../api/products';

export const useProductDetails = (
  productId: string,
  category: Category | null,
) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!category || !productId) {
      setProduct(null);

      return;
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      setErrorMessage('');
      setProduct(null);
      try {
        const productData = await getProductById(category, productId);

        setProduct(productData || null);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productId, category]);

  return { product, isLoading, errorMessage };
};
