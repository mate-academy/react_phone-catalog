import { BrandNew } from './components/BrandNew';
import { HotPrices } from './components/HotPrices';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <h1 className={styles.websiteTitle}>Product Catalog</h1>
      <PicturesSlider />
      <BrandNew />
      <ShopByCategory />
      <HotPrices />
    </div>
  );
};
