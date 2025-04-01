import { CurrentPage } from '../../shared/components/CurrentPage';
import styles from './ProductPage.module.scss';
import { ProductCatalog } from './components';

export const ProductPage = () => {
  return (
    <main className={styles.productPage}>
      <div className={styles.productPage__container}>
        <CurrentPage />

        <ProductCatalog />
      </div>
    </main>
  );
};
