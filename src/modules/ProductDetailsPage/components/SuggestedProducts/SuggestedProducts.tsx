import { ProductSlider } from "../../../../shared/components/ProductSlider";
import { Product } from "../../../../shared/types/Product";


type Props = {
  suggestedProducts: Product[];
};
export const SugProducts: React.FC<Props> = ({ suggestedProducts }) => {
  const title = 'You may also like';

  return (
    <ProductSlider
      title={title}
      products={suggestedProducts}
      isShowDiscount={false}
    />
  );
};
