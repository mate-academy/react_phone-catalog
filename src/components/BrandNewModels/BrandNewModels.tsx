import { useContext } from 'react';
import { ProductSlider } from '../ProductsSlider';
import { ProductsContext } from '../../store/ProductsContext';
import { getNewModelProducts } from '../../helpers/getNewModelProducts';

export const BrandNewModels = () => {
  const { products } = useContext(ProductsContext);
  const newModels = getNewModelProducts(products);

  return (
    <section>
      <ProductSlider products={newModels} title="Brand new models" />
    </section>
  );
};
