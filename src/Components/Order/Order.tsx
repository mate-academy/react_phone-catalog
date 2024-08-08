import styles from './Order.module.scss';

export const Order = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <h2 className={styles.gradient}> Now available in our store!&nbsp;</h2>
      </div>
      <span className={styles.sub}>Be the first!</span>
      <button className={styles.orderButton}>ORDER NOW</button>
    </div>
  );
};
