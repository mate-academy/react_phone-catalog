import { ProductsSlider } from '@/shared/components/ProductsSlider';
import { Product } from '@/shared/types/Product';

type Props = {
  products: Product[];
  showRegularPriceOnly: boolean;
};

export const BrandNew: React.FC<Props> = ({
  products,
  showRegularPriceOnly,
}) => (
  <ProductsSlider
    products={products}
    title="home.brandNew.title"
    showRegularPriceOnly={showRegularPriceOnly}
  />
);
