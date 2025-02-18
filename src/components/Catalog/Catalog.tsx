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
    </section>
  );
};
