import { Hero } from './components/Hero';
import styles from './HomePage.module.scss';
import { ShopByNewModels } from './components/ShopByNewModels';

export const HomePage = () => {
  return (
    <div className={styles.hero}>
      <Hero />
      <ShopByNewModels />
    </div>
  );
};
