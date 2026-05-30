import { NewModels } from './components/NewModels';
import { BannerSlider } from './components/BannerSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { HotPrices } from './components/HotPrices';
import styles from './HomePage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const HomePage = () => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return (
    <div className={styles.home__page}>
      <h2 className={styles.home__page_title}>
        Welcome to Nice Gadgets store!
      </h2>
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
