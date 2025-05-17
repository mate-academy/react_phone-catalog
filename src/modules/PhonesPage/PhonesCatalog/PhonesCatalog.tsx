import styles from './PhonesCatalog.module.scss';
import { ProductCard } from '../../shared/components/ProductCard';

export const PhoneCatalog = () => {
  return (
    <>
      <div className={styles.catalog}>
        <div className={styles['catalog__bread-crumbs']}>
          <img src="public/icons/Home.svg" alt="home icon" />
          <img src="public/icons/ArrowRight.svg" alt="arrow right icon" />
          <p className={styles['catalog__bread-crumbs--text']}>Phones</p>
        </div>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
};
