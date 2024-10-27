import { Hero } from './components/Hero';
import styles from './HomePage.module.scss';
import { NewModels } from './components/NewModels';
import { HotPrices } from './components/HotPrices';
import { ShopCategory } from './components/ShopCategory';

export const HomePage = () => {
  return (
    <div className={styles.hero}>
      <Hero />
      <NewModels />
      <ShopCategory />
      <HotPrices />
    </div>
  );
};
