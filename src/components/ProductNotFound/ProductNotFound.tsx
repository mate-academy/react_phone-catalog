import { GoBackLink } from '../ui/GoBackLink';
import styles from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  return (
    <div className={styles['not-found-product']}>
      <div className={styles['not-found-product__goback-link']}>
        <GoBackLink />
      </div>

      <div className={styles['not-found-product__title-block']}>
        <h2>No favorites yet</h2>
      </div>

      <div className={styles['not-found-product__img-block']}></div>
    </div>
  );
};
