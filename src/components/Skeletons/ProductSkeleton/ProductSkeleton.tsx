import styles from './ProductSkeleton.module.scss';

export const ProductSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.title} />
      <div className={styles.price} />
      <div className={styles.descBlock} />
      <div className={styles.descBlock} />
      <div className={styles.descBlock} />
      <div className={styles.btns} />
    </div>
  );
};
