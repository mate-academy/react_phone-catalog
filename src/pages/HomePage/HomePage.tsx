import { Banner } from './Banner/Banner';
import './HomePage.scss';
import { CategoryItems } from './Category/Category';
import { HotPrices } from './HotPrices/HotPrices';
import { BrandNew } from './BrandNew/BrandNew';

export const HomePage = () => {
  return (
    <>
      <div className="homePage">
        <Banner />
      </div>
      <div className="homePage__content">
        <BrandNew />
        <CategoryItems />
        <HotPrices />
      </div>
    </>
  );
};
