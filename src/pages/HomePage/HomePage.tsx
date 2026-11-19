import { PicturesSlider } from '../../components/PicturesSlider';
import { BrandNewModels } from '../../components/BrandNewModels';
import { ShopByCategory } from '../../components/ShopByCategory';
import { HotPrices } from '../../components/HotPrices';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      <BrandNewModels />
      <ShopByCategory />
      <HotPrices />
    </main>
  );
};
