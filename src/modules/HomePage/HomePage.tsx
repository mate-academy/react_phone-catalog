import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductCard } from '../shared/components/ProductCard';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.welcomeTitle}>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
      <ProductCard />
    </div>
  );
};
