import { useContext } from 'react';
import './BrandNew.scss';
import { ProductState } from '../../store/storeContext';
import { getBrandNewProducts } from '../../helpers/helpers';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const BrandNew = () => {
  const { products } = useContext(ProductState);

  const sortedByNew = getBrandNewProducts(products);

  return (
    <section className="brandNew">
      <ProductsSlider title="Brand new models" products={sortedByNew} />
    </section>
  );
};
