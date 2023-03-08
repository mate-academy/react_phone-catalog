import { useContext } from 'react';
import { ProductsSlider } from '../ProductsSlider';
import { ProductsContext } from '../../helpers/ProductsContext';

export const BrandNew = () => {
  const { productsFromServer } = useContext(ProductsContext);
  const productsNew = productsFromServer
    .filter(product => !product.discount)
    .sort((a, b) => b.price - a.price);

  return (
    <section className="brand-new">
      <ProductsSlider
        products={productsNew}
        title="New brands"
        className="brand-new"
      />
    </section>
  );
};
