import styles from './HomePage.module.scss';
import { PicturesSlider } from './componets/PicturesSlider';

export const HomePage = () => {
  return (
    <div className={styles.home_page}>
      <h1 className={styles.visually_hidden}>Product Catalog</h1>
      <h1 className={styles.home_page_header}>
        Welcome to Nice Gadgets store!
      </h1>
      <PicturesSlider />
    </div>
  );
};
