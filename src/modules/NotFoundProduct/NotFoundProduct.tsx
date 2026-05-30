import { Link } from 'react-router-dom';
import styles from './NotFoundProduct.module.scss';
import product from '/img/product-not-found.png';

export const NotFoundProduct = () => {
  return (
    <div className={styles.product}>
      <div className={styles.product_message}>
        <span className={styles.product_header}>Product not found</span>
        <Link to="/" className={styles.product_link}>
          Go to homepage
        </Link>
      </div>

      <img
        src={product}
        alt="Not found product"
        className={styles.product_img}
      />
    </div>
  );
};
