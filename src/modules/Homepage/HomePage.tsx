import { PicturesSlider } from './components/PicturesSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.something}>Product Catalog</h1>
      <h1 className={styles.container__title}>
        Welcome to Nice
        <br /> Gadgets store!
      </h1>
      <PicturesSlider />
    </div>
  );
};
