import { Product } from '../../types/Product';
import { ProductSlider } from '../../base/ProductSlider/ProductSlider';

type Props = {
  products: Product[];
};

export const BrandNewModels: React.FC<Props> = ({ products }) => {
  return (
    <ProductSlider
      title="Brand new models"
      products={products}
      showDiscount={false}
    />
  );
};
