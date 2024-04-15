import './HomePage.scss';
import { HotPrices } from '../../components/HotPrices';
import { BrandNew } from '../../components/BrandNew';
import { ShopBy } from '../../components/ByCategory';
import { PicturesSlider } from '../../components/PicturesSlider';

export const HomePage = () => {
  return (
    <div className="home-page">
      <div className="h1 home-page__title">Welcome to Nice Gadgets store!</div>

      <PicturesSlider />

      <BrandNew />

      <ShopBy />

      <HotPrices />
    </div>
  );
};
