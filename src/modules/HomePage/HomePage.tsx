import { HotPrices } from './components/HotPrices';
import { NewModels } from './components/NewModels';
import { ShopByCategory } from './components/ShopByCategory';
import { Slider } from './components/Slider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pageTitle}>
        Welcome to Nice Gadgets store! <h1 className={styles.pageTitle__hidden}>Product Catalog</h1>
      </div>

      <Slider />
      <NewModels />
      <ShopByCategory />
      <HotPrices />
    </div>
  );
};
