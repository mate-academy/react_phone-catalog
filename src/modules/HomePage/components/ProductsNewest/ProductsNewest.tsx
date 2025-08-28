import { Products } from '../../../../types/Products';
import { ProductsSlider } from '../../../../shared/layout/ProductsSlider';

type Props = {
  products?: Products[];
};

export const ProductsNewest: React.FC<Props> = ({ products }) => {
  const newestProducts = products
    ? [...products].sort((a, b) => b.year - a.year).slice(0, 15)
    : [];

  return (
    <ProductsSlider title={'Brand new models'} products={newestProducts} />
  );
};
