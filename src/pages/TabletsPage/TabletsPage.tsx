import { useContext } from 'react';
import { Products } from '../../components/Products';
import { ProductContext } from '../../context/productContext';

export const TabletsPage = () => {
  const { products } = useContext(ProductContext);
  const tablets = products.filter(product => product.category === 'tablets');

  return <Products title="Tablets" products={tablets} />;
};
