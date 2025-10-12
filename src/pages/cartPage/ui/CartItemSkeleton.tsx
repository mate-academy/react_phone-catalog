import styles from '../styles/cartItemSkeleton.module.scss';

export const CartItemSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.profile} ${styles.shimmer}`}></div>
      <div className={`${styles.content} ${styles.shimmer}`}></div>
    </div>
  );
};
