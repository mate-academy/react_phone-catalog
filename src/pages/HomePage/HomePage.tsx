import { NewModels } from './components/NewModels';
import { BannerSlider } from './components/BannerSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { HotPrices } from './components/HotPrices';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.home__page}>
      <h1 className={styles.home__page_title}>
        Welcome to Nice Gadgets store!
      </h1>
      <BannerSlider />
      <div className={styles.home__page_new_models_slider}>
        <NewModels />
      </div>
      <div className={styles.home__page_categories}>
        <ShopByCategory />
      </div>
      <div className={styles.home__page_hot_prices}>
        <HotPrices />
      </div>
    </div>
  );
};
