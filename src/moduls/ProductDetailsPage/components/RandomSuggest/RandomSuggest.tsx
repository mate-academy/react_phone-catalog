import { useContext } from 'react';
import { ProductSlider } from '../../../../shared/components/ProductSlider';
import { StateContext } from '../../../../Provider/GadgetsContext';
import { getRandomProducts } from '../../../../shared/utils/getRandomProducts';

type Props = {
  currentProductId: string;
};

export const RandomSuggest: React.FC<Props> = ({ currentProductId }) => {
  const { products } = useContext(StateContext);
  const suggestedProducts = getRandomProducts(products, currentProductId, 10);

  return <ProductSlider title="You may also like" goods={suggestedProducts} />;
};
