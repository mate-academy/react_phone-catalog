import { useContext } from 'react';
import { StateStore } from '../../store/StoreContext';
import { getHotPriceProducts } from '../../helpers/getHotPriceProducts';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import './HotPrices.scss';

export const HotPrices = () => {
  const { products } = useContext(StateStore);

  const storedByPrice = getHotPriceProducts(products);

  return (
    <section className="hotPrices">
      <ProductsSlider
        title="Hot prices"
        products={storedByPrice}
      />
    </section>
  );
};
