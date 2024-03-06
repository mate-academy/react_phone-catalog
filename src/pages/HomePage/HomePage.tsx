import './index.scss';
import { BrandNewModels } from '../../components/BrandNewModels/BrandNewModels';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { Banner } from '../../components/Banner/Banner';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

export const HomePage = () => {
  return (
    <div className="homePage">
      <Banner />

      <HotPrices />

      <ShopByCategory />

      <BrandNewModels />
    </div>
  );
};
