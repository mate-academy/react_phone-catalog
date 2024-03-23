import React, { useContext } from 'react';
import { Catalog } from '../Catalog';
import { StateContext } from '../../store/ProductsContext';

export const PhonesPage: React.FC = () => {
  const { products } = useContext(StateContext);

  const phones = products.filter(pr => pr.category === 'phones');

  return (
    <div className="PhonesPage">
      <Catalog products={phones} title="Mobile phones" />
    </div>
  );
};
