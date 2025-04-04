import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { CategoryCards } from './components/CategoryCards';
import { HomePageSlider } from './components/HomePageSlider';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.main__title}>Welcome to Nice Gadgets store!</h1>
      <div className={styles.main__wrapper}>
        <HomePageSlider />
        <ProductsSlider />
        <CategoryCards />
        <ProductsSlider />
      </div>
    </main>
  );
};
