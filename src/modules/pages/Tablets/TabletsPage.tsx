import React from 'react';
import CategoryPage from '../../shared/components/CategoryPage';
import { getTablets } from '../../../utils/fetchClient';

export const TabletsPage: React.FC = () => {
  return <CategoryPage type={'tablets'} getProducts={getTablets} />;
};

export default TabletsPage;
