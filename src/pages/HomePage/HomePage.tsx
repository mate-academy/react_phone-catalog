import { BannerSlider } from '../../components/BannerSlider';
import { BrandNew } from '../../components/BrandNew';
import { HotPrices } from '../../components/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory';

export const HomePage = () => {
  return (
    <>
      <BannerSlider />
      <HotPrices />
      <ShopByCategory />
      <BrandNew />
    </>
  );
};
