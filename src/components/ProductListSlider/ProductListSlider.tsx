import { Product } from '../../types/Product';
import { SliderSettings } from '../../types/SliderSettings';
import { ProductCards } from '../ProductCards';
import { Slider } from '../Slider';

type Props = {
  sliderSettings: SliderSettings;
  currentIndex: number;
  products: Product[];
  isHotPrice: boolean;
};

export const ProductListSlider: React.FC<Props> = ({
  products,
  sliderSettings,
  currentIndex,
  isHotPrice,
}) => {
  return (
    <Slider
      {...sliderSettings}
      index={currentIndex}
      slidesPerView={4}
      total={products.length}
      height={515}
    >
      <ProductCards isHotPrice={isHotPrice} products={products} />
    </Slider>
  );
};
