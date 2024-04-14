import { useContext } from 'react';
import './HotPrices.scss';
import { ProductState } from '../../store/storeContext';
import { getHotPriceProducts } from '../../helpers/helpers';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const HotPrices = () => {
  const { products } = useContext(ProductState);

  const productsByPrice = getHotPriceProducts(products);

  return (
    <section className="hotPrices">
      <ProductsSlider title="Hot prices" products={productsByPrice} />
    </section>
  );
};
