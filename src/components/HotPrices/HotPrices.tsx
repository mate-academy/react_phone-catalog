import { useProducts } from '../../store/ProductsContext';
import { getHotPriceProducts } from '../../services/products';
import { ProductsSlider } from '../ProductsSlider';
import './HotPrices.scss';

export const HotPrices = () => {
  const products = useProducts();
  const hotPriceProducts = getHotPriceProducts(products);

  return (
    <section className="hot-prices">
      <div className="hot-prices__content">
        <h1 className="title">
          Hot prices
        </h1>

        <ProductsSlider products={hotPriceProducts} type="hotPrice" />
      </div>
    </section>
  );
};
