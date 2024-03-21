import { useContext } from 'react';
import { StateContext } from '../../store/ProductsContext';
import { Catalog } from '../Catalog';

export const TabletsPage = () => {
  const { products } = useContext(StateContext);
  const phones = products.filter(pr => pr.category === 'tablet');

  return (
    <div className="PhonesPage">
      <Catalog products={phones} title="Tablets" />
    </div>
  );
};
