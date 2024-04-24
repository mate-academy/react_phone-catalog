import { Banner } from './Banner/Banner';
// import './HomePage.module.scss';
import './HomePage.scss';
import { HotPrices } from './HotPrices';
import { NewModels } from './NewModels';
import { ShopByCategory } from './ShopByCategory';

export const HomePage = () => {
  return (
    <div className="container">
      <h1 className="title">Welcome to Nice Gadgets store!</h1>

      <Banner />

      <NewModels />

      <ShopByCategory />

      <HotPrices />
    </div>
  );
};
