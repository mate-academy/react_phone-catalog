import React from 'react';
import CategoryPage from '../../shared/components/CategoryPage';
import { getPhones } from '../../../utils/fetchClient';

export const PhonesPage: React.FC = () => {
  return <CategoryPage type={'phones'} getProducts={getPhones} />;
};

export default PhonesPage;
