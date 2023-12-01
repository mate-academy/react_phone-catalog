import { BrandNew } from '../components/BrandNew/BrandNew';
import { HotPrice } from '../components/HotPrice/HotPrice';
import { ShopByCategory } from '../components/ShopByCategory/ShopByCategory';
import { Slider } from '../components/Slider/Slider';

export const HomePage = () => {
  return (
    <>
      <Slider slides={[]} />
      <HotPrice />
      <ShopByCategory products={[]} />
      <BrandNew products={[]} />
    </>
  );
};
