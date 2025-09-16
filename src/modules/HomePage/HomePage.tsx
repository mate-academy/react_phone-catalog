import styles from './HomePage.module.scss';
import { HotPrices } from './componets/HotPrices';
import { PicturesSlider } from './componets/PicturesSlider';

export const HomePage = () => {
  return (
    <div className={`${styles.home_page} ${styles.container}`}>
      <h1 className={styles.visually_hidden}>Product Catalog</h1>
      <h1 className={styles.home_page_header}>
        Welcome to Nice Gadgets store!
      </h1>
      <PicturesSlider />
      <HotPrices />
    </div>
  );
};
