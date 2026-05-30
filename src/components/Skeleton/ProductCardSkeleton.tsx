import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.name}></div>
      <div className={styles.prices}>
        <div className={styles.price}></div>
        <div className={styles.discount}></div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailRow}></div>
        <div className={styles.detailRow}></div>
        <div className={styles.detailRow}></div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.add}></div>
        <div className={styles.like}></div>
      </div>
    </div>
  );
};
