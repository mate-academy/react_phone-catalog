import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={`${styles.block} ${styles.image}`} />
      <div className={`${styles.block} ${styles.title}`} />
      <div className={styles.priceRow}>
        <div className={`${styles.block} ${styles.price}`} />
        <div className={`${styles.block} ${styles.fullPrice}`} />
      </div>
      <div className={`${styles.block} ${styles.divider}`} />
      <div className={styles.specs}>
        <div className={`${styles.block} ${styles.spec}`} />
        <div className={`${styles.block} ${styles.spec}`} />
        <div className={`${styles.block} ${styles.spec}`} />
      </div>
      <div className={styles.actions}>
        <div className={`${styles.block} ${styles.button}`} />
        <div className={`${styles.block} ${styles.icon}`} />
      </div>
    </article>
  );
};
