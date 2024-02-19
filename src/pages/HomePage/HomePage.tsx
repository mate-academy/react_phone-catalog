import { Banner } from '../../components/Banner/Banner';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="homePage">
      <Banner />

      <HotPrices />

      <ShopByCategory />

    </div>
  );
};
