import productNotFound from '/img/product-not-found.png';
import styles from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <img src={productNotFound} />
      <span className={styles.title}>Product was not found</span>
    </div>
  );
};
