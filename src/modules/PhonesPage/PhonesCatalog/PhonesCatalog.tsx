import styles from './PhonesCatalog.module.scss';
import { ProductCard } from '../../shared/components/ProductCard';

export const PhoneCatalog = () => {
  return (
    <>
      <div className={styles.catalog}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
};
