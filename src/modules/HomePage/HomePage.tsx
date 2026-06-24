import { Banner } from './components/Banner';
import { Category } from './components/Category';
import { HotPrices } from './components/HotPrices';
import { NewModels } from './components/NewModels';
import style from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={style.homePage}>
      <h1 className={style.visuallyHidden}>Product Catalog</h1>
      <Banner />
      <NewModels />
      <Category />
      <HotPrices />
    </div>
  );
};
