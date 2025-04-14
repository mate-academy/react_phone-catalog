import { CurrentPage } from '../../shared/components/CurrentPage';
import { ProductCard } from '../../shared/components/ProductCard';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  return (
    <main className={styles.favorites}>
      <div className={styles.favorites__container}>
        <CurrentPage />

        <div className={styles.favorites__cardWrapper}>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
          <div className={styles.favorites__card}>
            <ProductCard />
          </div>
        </div>
      </div>
    </main>
  );
};
