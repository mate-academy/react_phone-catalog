import styles from './SkeletonProductCard.module.scss';

export const SkeletonProductCard: React.FC = () => {
  return (
    <div className={styles.skeleton__card}>
      <div className={styles.skeleton__image} />
      <div className={styles.skeleton__title} />
      <div className={styles.skeleton__priceBox}>
        <div className={styles.skeleton__price} />
        <div className={styles.skeleton__fullPrice} />
      </div>
      <ul className={styles.skeleton__details}>
        <li className={styles.skeleton__detail} />
        <li className={styles.skeleton__detail} />
        <li className={styles.skeleton__detail} />
      </ul>
      <div className={styles.skeleton__buttons}>
        <div className={styles.skeleton__button} />
        <div className={styles.skeleton__buttonSmall} />
      </div>
    </div>
  );
};
