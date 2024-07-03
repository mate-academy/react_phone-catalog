import { useContext } from 'react';
import { Products } from '../../components/Products';
import { ProductContext } from '../../context/productContext';

export const AccessoriesPage = () => {
  const { products } = useContext(ProductContext);
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return <Products title="Accessories" products={accessories} />;
};
