import { HotPrices } from '../HotPrices';
import { Slider } from '../Banner';
import { ShopByCategory } from '../ShopByCategory';
import { BrandNewModels } from '../BrandNewModels';

export const HomePage = () => {
  return (
    <>
      <Slider />
      <HotPrices />
      <ShopByCategory />
      <BrandNewModels />
    </>
  );
};
