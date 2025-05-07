import { useContext } from 'react';
import { ProductsContext } from '../../store/ProductsContext';
import { getHotPricesProducts } from '../../helpers/getHotPricesProducts';
import { ProductSlider } from '../ProductsSlider';

export const HotPrices = () => {
  const { products } = useContext(ProductsContext);
  const hotPrices = getHotPricesProducts(products);

  return (
    <section>
      <ProductSlider products={hotPrices} title="Hot prices" />
    </section>
  );
};
