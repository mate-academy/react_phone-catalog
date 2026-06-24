import { useState, useEffect, useRef } from 'react';
import { ProductDetails } from '@/types/ProductDetails';
import { getProductDetails } from '@/shared/api/api';

export const useProductDetails = (category?: string, productSlug?: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isInitialLoadRef.current) {
      setLoading(true);
      isInitialLoadRef.current = false;
    }

    let ignore = false;

    getProductDetails(category)
      .then(products => {
        if (ignore) return;
        const foundProduct = products.find(p => p.id === productSlug);
        setProduct(foundProduct || null);
        setSelectedColor(foundProduct?.color || '');
        setSelectedCapacity(foundProduct?.capacity || '');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [category, productSlug]);

  return {
    product,
    loading,
    selectedColor,
    setSelectedColor,
    selectedCapacity,
    setSelectedCapacity,
  };
};
