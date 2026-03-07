import { useState, useCallback, useEffect } from 'react';
import { CatalogProducts, Product } from '../types/Types';
import {
  getProductById,
  getProducts,
  getSuggestedProducts,
} from '../api/products';

export const useProductDetails = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [catalogProduct, setCatalogProduct] = useState<CatalogProducts | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [suggestedProducts, setSuggestedProducts] = useState<CatalogProducts[]>(
    [],
  );

  const fetchProducts = useCallback(async () => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const allProducts = await getProducts();

      const match = allProducts.find(prod => prod.itemId === productId);

      if (!match) {
        throw new Error('Product not found in catalog');
      }

      setCatalogProduct(match);

      const data = await getProductById(match.category, productId);

      if (!data) {
        throw new Error('No product information found');
      }

      setProduct(data);
      setSelectedImage(data.images[0] || '');

      const suggested = await getSuggestedProducts();

      setSuggestedProducts(suggested);
    } catch (error) {
      setErrorMessage('Product was not found.');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    product,
    catalogProduct,
    isLoading,
    errorMessage,
    selectedImage,
    setSelectedImage,
    suggestedProducts,
  };
};
