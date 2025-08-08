import { BrandModels } from './components/BrandModels';
import { Header } from './components/Header';
import { HotPrices } from './components/HotPrice';
import { ShopByCategory } from './components/ShopByCategory';
import homeClass from './homePage.module.scss';
// import cn from 'classnames';

export const HomePage = () => {
  return (
    <section className={homeClass.home}>
      <Header />
      <BrandModels />
      <ShopByCategory />
      <HotPrices />
    </section>
  );
};
