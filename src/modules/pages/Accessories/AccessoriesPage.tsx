import React from 'react';
import CategoryPage from '../../shared/components/CategoryPage';
import { getAccessories } from '../../../utils/fetchClient';

export const AccessoriesPage: React.FC = () => {
  return <CategoryPage type={'accessories'} getProducts={getAccessories} />;
};

export default AccessoriesPage;
