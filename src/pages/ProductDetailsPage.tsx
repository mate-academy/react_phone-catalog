import { Breadcrumbs } from '@/components/Breadcrumbs';
import React from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();


  return (
    <div>
      <Breadcrumbs></Breadcrumbs>

      <h1>{productId}</h1>
    </div>
  );
};
