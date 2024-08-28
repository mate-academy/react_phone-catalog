import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';

export const AccessoriesPage: React.FC = () => {
  const location = useLocation();

  const category = location.pathname.split('/')[1];

  return <ProductsList category={category} title="Accessories" />;
};
