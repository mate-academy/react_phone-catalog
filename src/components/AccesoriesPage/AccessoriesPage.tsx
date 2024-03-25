import React, { useContext } from 'react';
import { StateContext } from '../../store/ProductsContext';
import { Catalog } from '../Catalog';

export const AccessoriesPage: React.FC = () => {
  const { products } = useContext(StateContext);
  const phones = products.filter(pr => pr.category === 'accessories');

  return (
    <div className="AccessoriesPage">
      <Catalog products={phones} title="Accessories" />
    </div>
  );
};
