import { useContext } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import ProductsPage from '../../components/ProductsPage/ProductsPage';

const Phones = () => {
  const { phones } = useContext(ProductsContext);

  return (
    <ProductsPage
      products={phones}
      title="Mobile phones"
      data-cy="productList"
    />
  );
};

export default Phones;
