import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../shared/hooks/hooks';
import styles from './ProductCategory.module.scss';

export const ProductCategory = () => {
  const { phones, tablets, accessories } = useAppSelector(
    state => state.product,
  );

  return (
    <div className={styles.category}>
      <h1 className={styles.category__title}>Shop by category</h1>

      <div className={styles.category__container}>
        <div className={styles.category__content}>
          <Link
            to="/phones"
            className={`${styles.category__background}
              ${styles.category__mobile}`}
          >
            <div
              className={`${styles.category__img}
                ${styles.category__mobile__img}`}
            ></div>
          </Link>
          <h3 className={styles.category__name}>Mobile phones</h3>
          <span className={styles.category__count}>
            {`${phones.length} models`}
          </span>
        </div>
        <div
          className={`${styles.category__content__tablets}
            ${styles.category__content}`}
        >
          <Link
            to="/tablets"
            className={`${styles.category__background}
              ${styles.category__tablets}`}
          >
            <div
              className={`${styles.category__img}
                ${styles.category__tablets__img}`}
            ></div>
          </Link>
          <h3 className={styles.category__name}>Tablets</h3>
          <span className={styles.category__count}>
            {`${tablets.length} models`}{' '}
          </span>
        </div>
        <div className={styles.category__content}>
          <Link
            to="/accessories"
            className={`${styles.category__background}
              ${styles.category__accessories}`}
          >
            <div
              className={`${styles.category__img}
                ${styles.category__accessories__img}`}
            ></div>
          </Link>
          <h3 className={styles.category__name}>Accessories</h3>
          <span
            className={styles.category__count}
          >{`${accessories.length} models`}</span>
        </div>
      </div>
    </div>
  );
};
