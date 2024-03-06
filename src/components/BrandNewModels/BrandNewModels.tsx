import { useContext } from 'react';
import { StateStore } from '../../store/StoreContext';
import { getBrandNewProducts } from '../../helpers/getBrandNewProducts';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const BrandNewModels = () => {
  const { products } = useContext(StateStore);

  const sortedByNew = getBrandNewProducts(products);

  return (
    <section className="brandNew">
      <ProductsSlider title="Brand new models" products={sortedByNew} />
    </section>
  );
};
