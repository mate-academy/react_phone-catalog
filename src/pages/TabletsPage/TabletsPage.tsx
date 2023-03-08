import { useContext } from 'react';
import { ProductsContext } from '../../helpers/ProductsContext';
import { ProductsList } from '../../components/ProductsList';

export const TabletsPage = () => {
  const { productsFromServer } = useContext(ProductsContext);
  const type = 'tablet';
  const tablets = productsFromServer
    .filter(product => product.type === type);

  return (
    <ProductsList
      products={tablets}
      title="Tablets"
    />
  );
};
