import { useContext } from 'react';
import { Products } from '../../components/Products';
import { ProductContext } from '../../context/productContext';

export const PhonesPage = () => {
  const { products } = useContext(ProductContext);
  const phones = products.filter(product => product.category === 'phones');

  return <Products title="Mobile Phones" products={phones} />;
};
