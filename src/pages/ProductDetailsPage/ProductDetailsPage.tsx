import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetails } from '../../components/ProductDetails';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();

  return (
    <ProductDetails key={productId} />
  );
};
