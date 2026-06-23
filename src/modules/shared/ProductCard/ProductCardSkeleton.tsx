import styles from './ProductCard.module.scss';

export const ProductCardSkeleton = () => (
  <article className={styles.productCard}>
    <div className={styles.linkWrapper}>
      <div className={`${styles.imgWrapper} ${styles.skeleton}`}></div>

      <div className={`${styles.title} ${styles.skeleton}`}></div>
    </div>

    <div className={`${styles.priceWrapper} ${styles.skeleton}`}></div>

    <div className={styles.specs}>
      <span className={`${styles.specsItem} ${styles.skeleton}`}></span>

      <span className={`${styles.specsItem} ${styles.skeleton}`}></span>

      <span className={`${styles.specsItem} ${styles.skeleton}`}></span>
    </div>

    <div className={styles.buttons}>
      <button className={`${styles.btnAdd} ${styles.skeleton}`}></button>

      <button className={`${styles.btnFav} ${styles.skeleton}`}></button>
    </div>
  </article>
);
