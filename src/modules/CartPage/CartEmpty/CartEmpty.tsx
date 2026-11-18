import styles from './CartEmpty.module.scss';

export const CartEmpty = () => {
  return (
    <div className={styles['cart-empty']}>
      <img
        src={`${import.meta.env.BASE_URL}public/img/cart-is-empty.png`}
        alt="Cart is empty"
        className={styles['cart-empty__image']}
      />
      <p className={styles['cart-empty__message']}>Your cart is empty</p>
    </div>
  );
};
