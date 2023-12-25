import { useContext } from 'react';
import './BrandNew.scss';
import { StateStore } from '../../../store/StoreContext';
import { ProductsSlider } from '../../ProductsSlider/ProductsSlider';
import { getBrandNewProducts } from '../../../helpers/getBrandNewProducts';

export const BrandNew = () => {
  const { products } = useContext(StateStore);

  const sortedByNew = getBrandNewProducts(products);

  return (
    <section className="brandNew">
      <ProductsSlider
        title="Brand new models"
        products={sortedByNew}
      />
    </section>
  );
};
