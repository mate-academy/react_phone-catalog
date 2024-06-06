import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../../../shared/ProductsSlider ';

type Props = {
  products: Product[];
};

export const BrandNew: React.FC<Props> = ({ products }) => {
  const newProducts = [...products.sort((a, b) => b.price - a.price)];
  const title = 'Brand new models';

  return (
    <section className="brandNew">
      <ProductsSlider products={newProducts} title={title} discount={false} />
    </section>
  );
};
