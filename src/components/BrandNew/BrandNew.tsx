import { useContext } from 'react';
import { ProductsSlider } from '../ProductsSlider';
import { ProductsContext } from '../../helpers/ProductsContext';

export const BrandNew = () => {
  const { productsFromServer } = useContext(ProductsContext);
  const newProducts = productsFromServer
    .filter(product => !product.discount)
    .sort((a, b) => b.price - a.price);

  return (
    <section className="brand-new">
      <ProductsSlider
        products={newProducts}
        title="New brands"
        className="brand-new"
      />
    </section>
  );
};
