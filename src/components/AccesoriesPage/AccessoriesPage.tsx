import React, { useContext } from 'react';
import { StateContext } from '../../store/ProductsContext';
import { Catalog } from '../Catalog';

export const AccessoriesPage: React.FC = () => {
  const { products } = useContext(StateContext);
  const phones = products.filter(pr => pr.category === 'accessory');

  return (
    <div className="PhonesPage">
      <Catalog products={phones} title="Accessory" />
    </div>
  );
};
