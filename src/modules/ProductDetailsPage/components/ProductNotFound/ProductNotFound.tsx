import styles from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  return (
    <div className={styles.productNotFound}>
      <h1 className={styles.message}>Product was not found</h1>
      <img
        src="/img/product-not-found.png"
        alt="Product not found image"
        className={styles.img}
      />
    </div>
  );
};
