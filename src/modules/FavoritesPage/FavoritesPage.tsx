import { CurrentPage } from '../../shared/components/CurrentPage';
import { ProductCatalog } from '../ProductPage/components';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  return (
    <main className={styles.favorites}>
      <div className={styles.favorites__container}>
        <CurrentPage />

        <ProductCatalog />
      </div>
    </main>
  );
};
