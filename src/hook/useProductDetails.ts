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

  const fetchProducts = useCallback(async () => {
    if (!productId) {
      return;
    }

    try {
      const allProducts = await getProducts();
      const catalogProduct = allProducts.find(
        item => item.itemId === productId,
      );

      if (!catalogProduct) {
        throw new Error('Prroduct not found in the cut');
      }

      setSelectedProsuct(catalogProduct);

      const data = await getProductById(catalogProduct.category, productId);

      if (!data) {
        throw new Error('Not found product details');
      }

      setProduct(data);
      setProductImage(data.images[0]);

      const suggestedProducts = await getSuggestedProducts();

      setSuggested(suggestedProducts);
    } catch (error) {
      throw new Error('Product was not found');
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
  };
};
