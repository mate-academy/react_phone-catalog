import React, { useContext } from 'react';
import { StateContext } from '../../store/ProductsContext';
import { Catalog } from '../Catalog';

export const TabletsPage: React.FC = () => {
  const { products } = useContext(StateContext);
  const phones = products.filter(pr => pr.category === 'tablets');

  return (
    <div className="TabletsPage">
      <Catalog products={phones} title="Tablets" />
    </div>
  );
};
