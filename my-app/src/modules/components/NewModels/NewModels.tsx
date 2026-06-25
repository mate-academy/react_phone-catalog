import { ProductSlider } from '../ProductSlider';
import type { Product } from '../../../types';

interface Props {
  products: Product[];
}

export const NewModels = ({ products }: Props) => {
  const maxYear = products.length
    ? Math.max(...products.map((p) => p.year))
    : 0;
  const newProducts = products.filter((p) => p.year === maxYear);

  return <ProductSlider title="Brand new models" products={newProducts} />;
};

