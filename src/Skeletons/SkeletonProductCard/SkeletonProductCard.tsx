import styles from './SkeletonProductCard.module.scss';

export const SkeletonProductCard: React.FC = () => {
  return (
    <article className={styles.card} aria-hidden="true">
      <div className={styles.header}>
        <div className={styles.image} />
        <div className={styles.title} />
      </div>

      <div className={styles.prices}>
        <div className={styles.price} />
      </div>

      <div className={styles.separator} />

      <div className={styles.specs}>
        <div className={styles.specRow} />
        <div className={styles.specRow} />
        <div className={styles.specRow} />
      </div>

      <div className={styles.actions}>
        <div className={styles.button} />
        <div className={styles.iconButton} />
      </div>
    </article>
  );
};
