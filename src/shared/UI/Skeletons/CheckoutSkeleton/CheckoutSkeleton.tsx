import styles from './CheckoutSkeleton.module.scss';

export const CheckoutSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.price} ${styles.pulsate}`} />
        <div className={`${styles.items} ${styles.pulsate}`} />
      </div>

      <hr className={styles.line} />
      <div className={`${styles.button} ${styles.pulsate}`} />
    </div>
  );
};
