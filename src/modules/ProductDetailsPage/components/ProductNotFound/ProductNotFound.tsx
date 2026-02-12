import styles from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  return (
    <section className={styles.productNotFound}>
      <h2 className={styles.productNotFound__title}>Product was not found</h2>
    </section>
  );
};
