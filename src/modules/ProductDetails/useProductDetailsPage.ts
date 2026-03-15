import { useState, useEffect, useMemo } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { getProductById } from '../shared/services/productService';
import { ProductDetails } from '../../types/ProductDetails';
import { ContextProps } from '../../types/ContextProps';
import { scrollToTop } from '../shared/utils/scrollUtils';

export const useProductDetailsPage = () => {
  const { products } = useOutletContext<ContextProps>();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    getProductById(productId)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [productId]);

  useEffect(() => {
    if (!loading) {
      scrollToTop();
    }
  }, [productId, loading]);

  const baseProduct = useMemo(
    () => products.find(p => p.itemId === productId),
    [products, productId],
  );

  const suggestedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter(p => p.category === product.category && p.itemId !== productId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }, [products, product, productId]);

  return {
    product,
    baseProduct,
    suggestedProducts,
    loading,
    productId,
  };
};
