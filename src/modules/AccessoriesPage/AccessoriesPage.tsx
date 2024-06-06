import React from 'react';
import { Catalog } from '../shared/Catalog';
import { Category } from '../../types/Categories';

export const AccessoriesPage: React.FC = () => {
  return (
    <div className="accessoriesPage">
      <Catalog category={Category.Accessories} />
    </div>
  );
};
