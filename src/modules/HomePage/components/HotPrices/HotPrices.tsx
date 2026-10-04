import { ProductsSlider } from '@/shared/components/ProductsSlider';
import { Product } from '@/shared/types/Product';

type Props = {
  products: Product[];
};

export const HotPrices: React.FC<Props> = ({ products }) => (
  <ProductsSlider products={products} title="home.hotPrices.title" />
);
