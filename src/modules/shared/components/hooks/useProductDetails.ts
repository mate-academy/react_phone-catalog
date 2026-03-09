import { useState, useEffect } from 'react';
import { ProductDetails } from '../../../../types';

const BASE = import.meta.env.DEV ? '/' : '/react_phone-catalog/';

export const useProductDetails = (category: string, productId: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setNotFound(false);

    fetch(`${BASE}api/${category}.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        return res.json();
      })
      .then((data: ProductDetails[]) => {
        const found = data.find(p => p.id === productId);

        if (!found) {
          setNotFound(true);
        } else {
          setProduct(found);
        }

        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category, productId]);

  return { product, loading, error, notFound };
};
