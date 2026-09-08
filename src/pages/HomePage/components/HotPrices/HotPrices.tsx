import { Slider } from '../../../../components/ProductSlider/Slider';
import { useProducts } from '../../../../shared/context/ProductsContext';

export const HotPrices = () => {
  const { hotProducts } = useProducts();
  const HotPricesTitle = 'Hot prices';

  return (
    <Slider products={hotProducts} title={HotPricesTitle} discount={true} />
  );
};
