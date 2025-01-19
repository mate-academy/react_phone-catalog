import emptyCart from '../../../public/img/cart-is-empty.png';
import styles from './CartEmpty.module.scss';

export const CartEmpty = () => {
  return (
    <div className={styles.cartEmpty}>
      <div className={styles.cartEmpty__contain}>
        <h1>Your cart is empty</h1>
      </div>
      <img src={emptyCart} alt="Not found" className={styles.cartEmpty__img} />
    </div>
  );
};
