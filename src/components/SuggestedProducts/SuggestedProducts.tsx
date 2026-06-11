import { Product, ProductSlider } from '../ProductSlider/ProductSlider';

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
