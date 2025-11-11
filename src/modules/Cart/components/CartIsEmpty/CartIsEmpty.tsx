import styles from './CartIsEmpty.module.scss';

export const CartIsEmpty = () => {
  return (
    <div className={styles.container}>
      <div className={styles.status}>Your cart is empty</div>
      <img src="./img/cart-is-empty.png" alt="isEmpty" />
    </div>
  );
};
