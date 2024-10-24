import styles from './EmptyCart.module.scss';

export const EmptyCart: React.FC = () => {
  return (
    <div className={styles['empty-cart']}>
      <p className={styles['empty-cart__text']}>Your cart is empty</p>
      <img
        className={styles['empty-cart__img']}
        src="/img/cart-is-empty.png"
        alt="Empty cart"
      />
    </div>
  );
};
