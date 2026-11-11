import styles from './SkeletonProduct.module.scss';

export const SkeletonProduct = () => (
  <div className={styles['product-card-skeleton']} aria-hidden="true">
    <div className={`${styles.skeleton} ${styles['skeleton--image']}`} />
    <div className={`${styles.skeleton} ${styles['skeleton--title']}`} />
    <div className={`${styles.skeleton} ${styles['skeleton--price']}`} />
    <div className={`${styles.skeleton} ${styles['skeleton--rows']}`} />
    <div className={`${styles.skeleton} ${styles['skeleton--button']}`} />
  </div>
);
