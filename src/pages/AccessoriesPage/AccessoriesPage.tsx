import { useContext } from 'react';
import { ProductsContext } from '../../helpers/ProductsContext';
import { ProductsList } from '../../components/ProductsList';

export const AccessoriesPage = () => {
  const { productsFromServer } = useContext(ProductsContext);
  const type = 'accessory';
  const accessories = productsFromServer
    .filter(product => product.type === type);

  return (
    <ProductsList
      products={accessories}
      title="Accessories"
    />
  );
};
