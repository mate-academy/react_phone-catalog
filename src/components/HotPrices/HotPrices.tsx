import { useContext } from 'react';
import { ProductsSlider } from '../ProductsSlider';
import { ProductsContext } from '../../helpers/ProductsContext';

export const HotPrices = () => {
  const { productsFromServer } = useContext(ProductsContext);
  const productsWithDiscount = productsFromServer
    .filter(product => product.discount);

  return (
    <section className="hot-prices">
      <ProductsSlider
        products={productsWithDiscount}
        title="Hot prices"
        className="hot-prices"
      />
    </section>
  );
};
