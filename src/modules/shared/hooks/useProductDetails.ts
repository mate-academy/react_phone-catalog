import { useEffect, useState } from 'react';
import { useProducts } from './useProducts';
import { ProductDetails } from '../types/ProductDetails';
import { getPublicPath } from '../utils/getPublicPath';

export function useProductDetails(productId: string | undefined) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { products, loading: productsLoading } = useProducts();

  async function getProductDetails() {
    if (productsLoading) {
      return;
    }

    setLoading(true);
    setError(false);

    const summary = products.find(p => p.itemId === productId);

    if (!summary) {
      setError(true);
      setLoading(false);

      return;
    }

    try {
      const response = await fetch(
        getPublicPath(`api/${summary.category}.json`),
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: ProductDetails[] = await response.json();
      const found = data.find(p => p.id === productId) ?? null;

      setProduct(found);
      if (!found) {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [productId, products, productsLoading]);

  return { product, loading, error, refetch: getProductDetails };
}
