import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../../../shared/ProductsSlider';

type Props = {
  products: Product[];
};

export const HotPrices: React.FC<Props> = ({ products }) => {
  const hotProducts = [...products.sort((a, b) => b.fullPrice - a.fullPrice)];
  const title = 'Hot prices';

  return (
    <section className="hotPrices">
      <ProductsSlider products={hotProducts} title={title} discount={true} />
    </section>
  );
};
