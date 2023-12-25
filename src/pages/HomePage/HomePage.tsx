import { Banner } from '../../components/HomePage/Banner/Banner';
import { HotPrices } from '../../components/HomePage/HotPrices/HotPrices';
import { ShopByCategory } from
  '../../components/HomePage/ShopByCategory/ShopByCategory';
import { BrandNew } from '../../components/HomePage/BrandNew/BrandNew';
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
