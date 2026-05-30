import './HomePage.scss';
import { HomePageBrandNewModels } from '../HomePageBrandNewModels/HomePageBrandNewModels';
import { HomePageSlider } from '../HomePageSlider/HomePageSlider';
import { HomePageCategories } from '../HomePageCategories/HomePageCategories';
import { HomePageHotPrices } from '../HomePageHotPrices/HomePageHotPrices';

export const HomePage = () => {
  return (
    <div className="homePage">
      <div className="container">
        <h1 className="homePage__title">Welcome to Nice Gadgets store!</h1>

        <HomePageSlider />

        <HomePageBrandNewModels />

        <HomePageCategories />

        <HomePageHotPrices />
      </div>
    </div>
  );
};
