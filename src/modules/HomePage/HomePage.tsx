import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.productCatalog}>Product Catalog</h1>
      <PicturesSlider />
    </div>
  );
};
