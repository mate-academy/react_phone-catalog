import { useContext } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import ProductsPage from '../../components/ProductsPage/ProductsPage';

const Tablets = () => {
  const { tablets } = useContext(ProductsContext);

  return (
    <ProductsPage products={tablets} title="Tablets" />
  );
};

export default Tablets;
