import { useContext } from 'react';
import { ProductsContext } from '../../helpers/ProductsContext';
import { ProductsList } from '../../components/ProductsList';

export const PhonesPage = () => {
  const { productsFromServer } = useContext(ProductsContext);
  const type = 'phone';
  const phones = productsFromServer
    .filter(product => product.type === type);

  return (
    <ProductsList
      products={phones}
      title="Mobile phones"
    />
  );
};
