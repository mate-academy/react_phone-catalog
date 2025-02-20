import { Dropdown } from '../Dropdown';
import { ProductCard } from '../ProductCard';
import styles from './Catalog.module.scss';

interface CatalogProps {
  isSortingAvailable: boolean;
}

export const Catalog: React.FC<CatalogProps> = ({ isSortingAvailable }) => {
  return (
    <section className={styles.catalog}>
      {isSortingAvailable && (
        <div className={styles.catalog__sortContainer}>
          <div className={styles.catalog__sortBy}>
            <Dropdown />
          </div>

          <div className={styles.catalog__itemsOnPage}>
            <Dropdown />
          </div>
        </div>
      )}

      <div className={styles.catalog__list}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <div className={styles.catalog__buttonSection}>
        <button
          className={`${styles.catalog__button} ${styles.catalog__navigationButton} ${styles.catalog__navigationButtonLeft}`}
        ></button>

        <div className={styles.catalog__listButtonsContainer}>
          <button
            className={`${styles.catalog__button} ${styles.catalog__listButton}`}
          >
            1
          </button>
          <button
            className={`${styles.catalog__button} ${styles.catalog__listButton} ${styles.catalog__listButtonActive}`}
          >
            2
          </button>
          <button
            className={`${styles.catalog__button} ${styles.catalog__listButton}`}
          >
            3
          </button>
          <button
            className={`${styles.catalog__button} ${styles.catalog__listButton}`}
          >
            4
          </button>
        </div>

        <button
          className={`${styles.catalog__button} ${styles.catalog__navigationButton} ${styles.catalog__navigationButtonRight}`}
        ></button>
      </div>
    </section>
  );
};
