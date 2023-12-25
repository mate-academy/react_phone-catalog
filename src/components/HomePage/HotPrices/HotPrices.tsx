import { useContext } from 'react';
import './HotPrices.scss';
import { StateStore } from '../../../store/StoreContext';
import { ProductsSlider } from '../../ProductsSlider/ProductsSlider';
import { getHotPriceProducts } from
  '../../../helpers/getHotPriceProducts';

export const HotPrices = () => {
  const { products } = useContext(StateStore);

  const sortedByPrice = getHotPriceProducts(products);

  return (
    <section className="hotPrices">
      <ProductsSlider
        title="Hot prices"
        products={sortedByPrice}
      />
    </section>
  );
};
