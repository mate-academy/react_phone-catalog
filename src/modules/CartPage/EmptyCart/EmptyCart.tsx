import styles from './EmptyCart.module.scss';

export const EmptyCart = () => {
  return (
    <div className={styles['empty-cart']}>
      <p className={styles['empty-cart__text']}>Your cart is empty</p>
      <img
        className={styles['empty-cart__image']}
        src="img/cart-is-empty.png"
        alt="Empty Cart"
      />
    </div>
  );
};
