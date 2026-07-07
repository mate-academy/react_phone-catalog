import styles from './CartPage.module.scss';

export const CartPage = () => {
  return (
    <section className={styles.cartPage}>
      <h1 className={styles.title}>Cart</h1>
      <p>Your cart is empty</p>
    </section>
  );
};
