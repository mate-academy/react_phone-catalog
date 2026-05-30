import styles from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  return (
    <div className={styles.product_not_found}>
      <h1 className={styles.product_not_found__title}>Product Not Found</h1>
      <div className={styles.product_not_found__image}></div>
    </div>
  );
};
