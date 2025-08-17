// hooks/useFullProductById.ts
import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProductById } from './productsApi';

export const useFullProductById = (productId: string | undefined) => {
  const [fullProduct, setFullProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFullProduct = async () => {
      if (!productId) {
        setError('No product ID provided');
        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const baseProduct = await getProductById(productId);

        if (!baseProduct || !baseProduct.itemId || !baseProduct.category) {
          throw new Error('Product data incomplete');
        }

        const categoryRes = await fetch(`/api/${baseProduct.category}.json`);

        if (!categoryRes.ok) {
          throw new Error('Failed to fetch category data');
        }

        const categoryProducts: Product[] = await categoryRes.json();
        const categoryProduct = categoryProducts.find(
          p => p.id === baseProduct.itemId,
        );

        if (!categoryProduct) {
          throw new Error('Product not found in category data');
        }

        // Збираємо повний продукт
        const mergedProduct: Product = {
          ...baseProduct,
          ...categoryProduct,
        };

        setFullProduct(mergedProduct);
      } catch (err: unknown) {
        setError((err as Error).message || 'Unknown error');
        setFullProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFullProduct();
  }, [productId]);

  return { product: fullProduct, loading, error };
};
