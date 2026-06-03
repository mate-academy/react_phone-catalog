import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Category } from '@/shared/type';
import { ProductDetails } from './components/ProductDetails/ProductDetails';

export const ProductDetailsPage = ({ category }: { category: Category }) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId = 0;

    if (!productId) {
      timeoutId = window.setTimeout(() => {
        navigate('..', { replace: true });
      }, 1000);
      return;
    }
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [productId, navigate]);

  if (!productId) {
    return;
  }

  return (
    <main>
      <ProductDetails key={productId} category={category} productId={productId}></ProductDetails>
    </main>
  );
};
