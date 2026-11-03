import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.imageSkeleton} />
      <div className={styles.titleSkeleton} />
      <div className={styles.priceSkeleton} />
      <div className={styles.buttonSkeleton} />
    </div>
  );
};
