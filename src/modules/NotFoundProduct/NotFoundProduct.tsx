import { Link } from 'react-router-dom';
import styles from './NotFoundProduct.module.scss';

export const NotFoundProduct = () => {
  return (
    <div className={styles.not_found_product}>
      <h1 className={styles.not_found_product__title}>Product was not found</h1>

      <Link to="/" className={styles.not_found_product__link}>
        Go Home
      </Link>

      <img
        src="/img/product-not-found.png"
        alt="product not found img"
        className={styles.not_found_product__img}
      />
    </div>
  );
};
