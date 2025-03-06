import styles from './HomePage.module.scss';
import { HomeBanner } from './components/HomeBanner';
import { ShopCategory } from './components/ShopCategory';

export const HomePage = () => {
  return (
    <main className="">
      <div className="page-container">
        <h1 className={styles.main__title}>Welcome to Nice Gadgets store!</h1>
        <div className={styles.main__content}>
          <HomeBanner />
          <ShopCategory />
        </div>
      </div>
    </main>
  );
};
