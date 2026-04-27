import styles from './CartPage.module.scss';

export const CartPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.content}>
        <div className={styles.items} />
        <div className={styles.checkout} />
      </div>
    </div>
  );
};
