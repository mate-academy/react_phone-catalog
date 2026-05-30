import { Categories } from './components/Categories';
import { HotPrices } from './components/HotPrices';
import { NewModels } from './components/NewModels';
import { PicturesSlider } from './components/PicturesSlider';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.HomePage}>
      <h1 style={{ display: 'none' }}>Product Catalog</h1>
      <h2 className={styles.HomePage__title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.HomePage__content}>
        <PicturesSlider />

        <NewModels />

        <Categories />

        <HotPrices />
      </div>
    </div>
  );
};
