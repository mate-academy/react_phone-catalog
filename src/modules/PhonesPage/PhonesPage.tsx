import React from 'react';
import { Catalog } from '../shared/Catalog';
import { Category } from '../../types/Categories';

export const PhonesPage: React.FC = () => {
  return (
    <div className="phonesPage">
      <Catalog category={Category.Phones} />
    </div>
  );
};
