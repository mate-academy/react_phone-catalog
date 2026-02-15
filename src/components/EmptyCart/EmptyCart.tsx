import styles from './EmptyCart.module.scss';
import cartIsEmpty from '../../assets/img/cart-is-empty.png';

export const EmptyCart = () => {
  return (
    <div className={styles['empty-cart']}>
      <p className={styles['empty-cart__text']}>Your cart is empty</p>
      <img
        src={cartIsEmpty}
        alt="cart-is-empty.png"
        className={styles['empty-cart__img']}
      />
    </div>
  );
};
