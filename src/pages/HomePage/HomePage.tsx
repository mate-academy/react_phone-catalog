import { Banner } from '../../components/Banner/Banner';
import { BrandNew } from '../../components/BrandNew/BrandNew';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="homePage">
      <Banner />

      <HotPrices />

      <ShopByCategory />

      <BrandNew />
    </div>
  );
};
