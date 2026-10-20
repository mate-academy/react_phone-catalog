import styles from './CarItemSkeleton.module.scss';

export const CartItemSkeleton = () => {
  return (
    <article className={styles.skeleton}>
      <div className={styles.skeleton__product}>
        <div className={styles.skeleton__remove} />
        <div className={styles.skeleton__image} />
        <div className={styles.skeleton__name} />
      </div>

      <div className={styles.skeleton__purchase}>
        <div className={styles.skeleton__quantity} />
        <div className={styles.skeleton__price} />
      </div>
    </article>
  );
};
