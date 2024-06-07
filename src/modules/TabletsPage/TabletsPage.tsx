import React from 'react';
import { Catalog } from '../shared/Catalog';
import { Category } from '../../types/Categories';

export const TabletsPage: React.FC = () => {
  return (
    <div className="tabletsPage">
      <Catalog category={Category.Tablets} />
    </div>
  );
};
