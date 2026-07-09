import { useCallback, useEffect, useState } from 'react';
import { Product, Products } from '../types/Types';
import {
  getProductById,
  getProducts,
  getSuggestedProducts,
} from '../api/products';

export const useProductDetails = (productId: string | undefined) => {
  const [selectedProsuct, setSelectedProsuct] = useState<Products | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Products[] | null>(null);
  const [productImage, setProductImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = useCallback(async () => {
    if (!productId) {
      return;
    }

    try {
      setErrorMessage('');
      const allProducts = await getProducts();
      const catalogProduct = allProducts.find(
        item => item.itemId === productId,
      );

      if (!catalogProduct) {
        throw new Error('Product was not found');
      }

      setSelectedProsuct(catalogProduct);

      const data = await getProductById(catalogProduct.category, productId);

      if (!data) {
        throw new Error('Product was not found');
      }

      setProduct(data);
      setProductImage(data.images[0]);

      const suggestedProducts = await getSuggestedProducts();

      setSuggested(suggestedProducts);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(String(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    selectedProsuct,
    product,
    suggested,
    setProductImage,
    productImage,
    isLoading,
    errorMessage,
  };
};
