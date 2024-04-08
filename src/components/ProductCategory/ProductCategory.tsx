import { useAppSelector } from '../../app/hooks';
import styles from './ProductCategory.module.scss';

export const ProductCategory = () => {
  const { product: hotPrice } = useAppSelector(state => state.product);
  return (
    <div className={styles.category}>
      <h1 className={styles.category__title}>
        Shop by category
      </h1>

      <div className={styles.category__container}>
        <div className={styles.category_content}>
          <a className={`${styles.category__background} ${styles.category__mobile}`}>
              <div className={`${styles.category__img} ${styles.category__mobile__img}`}></div>
          </a>
          <h3 className={styles.category__name}>
            Mobile phones
          </h3>
          <span className={styles.category__count}>
            {`${hotPrice.length} models`}
          </span>
          
        </div>
        <div className={styles.category_content}>
          <a className={`${styles.category__background} ${styles.category__tablets}`}>
              <div className={`${styles.category__img} ${styles.category__tablets__img}`}></div>
          </a>
          <h3 className={styles.category__name}>
            Tablets
          </h3>
          <span className={styles.category__count}>
            0 models
          </span>
        </div>
        <div className={styles.category_content}>
          <a className={`${styles.category__background} ${styles.category__accessories}`}>
              <div className={`${styles.category__img} ${styles.category__accessories__img}`}></div>
          </a>
          <h3 className={styles.category__name}>
            Accessories
          </h3>
          <span className={styles.category__count}>
            0 models
          </span>
        </div>
      </div>
    </div>

  );
};
