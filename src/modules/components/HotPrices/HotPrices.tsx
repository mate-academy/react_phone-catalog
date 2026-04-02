import { ProductSlider } from '../ProductSlider';
import type { Product } from '../../../types';

const HOT_PRICES_LIMIT = 20;

interface Props {
  products: Product[];
}

export const HotPrices = ({ products }: Props) => {
  const hotProducts = [...products]
    .filter((p) => p.fullPrice > p.price)
    .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
    .slice(0, HOT_PRICES_LIMIT);

  return <ProductSlider title="Hot prices" products={hotProducts} />;
};

