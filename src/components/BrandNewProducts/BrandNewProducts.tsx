import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';

type Props = {
  products: Product[],
};

export const BrandNewProducts: React.FC<Props> = ({ products }) => (
  <section className="brand-new-products">
    <h1 className="title rainbow-text brand-new-products__title">
      Brand new models
    </h1>
    <div className="brand-new-products__slider">
      <ProductsSlider products={products} />
    </div>
  </section>
);
