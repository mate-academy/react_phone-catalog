import './ProductDetailsPage.scss';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../../components/ProductDetail';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();

  return (
    <ProductDetail
      productId={productId}
      key={productId}
    />
  );
};
