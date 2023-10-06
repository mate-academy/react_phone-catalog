import { useContext } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import ProductsPage from '../../components/ProductsPage/ProductsPage';

const Accessories = () => {
  const { accessories } = useContext(ProductsContext);

  return (
    <ProductsPage products={accessories} title="Accessories" />
  );
};

export default Accessories;
