import { useContext } from 'react';

import './index.scss';
import { StateStore } from '../../store/StoreContext';
import { getHotPriceProducts } from '../../helpers/getHotPriceProducts';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const HotPrices = () => {
  const { products } = useContext(StateStore);

  const sortedByPrice = getHotPriceProducts(products);

  return (
    <section className="hotPrices">
      <ProductsSlider title="Hot prices" products={sortedByPrice} />
    </section>
  );
};
