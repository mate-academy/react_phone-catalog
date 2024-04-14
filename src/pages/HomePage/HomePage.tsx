import './HomePage.scss';
import { Banner } from '../../components/Banner/Banner';
import { BrandNew } from '../../components/BrandNew/BrandNew';
import { CategoriesList } from '../../components/CategoriesList/CategoriesList';
import { HotPrices } from '../../components/HotPrices/HotPrices';

export const HomePage = () => (
  <div className="homePage">
    <Banner />

    <BrandNew />

    <CategoriesList />

    <HotPrices />
  </div>
);
