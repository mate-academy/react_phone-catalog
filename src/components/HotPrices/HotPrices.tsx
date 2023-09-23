import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';

type Props = {
  products: Product[],
};

export const HotPrices: React.FC<Props> = ({ products }) => (
  <section className="hot-prices">
    <div className="hot-prices__header">
      <h1 className="title rainbow-text hot-prices__title">
        Hot prices
      </h1>
    </div>

    <div className="hot-prices__slider">
      <ProductsSlider products={products} />
    </div>
  </section>
);
