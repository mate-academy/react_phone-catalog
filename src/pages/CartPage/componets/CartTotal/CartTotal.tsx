import { DividingLine } from '../../../../components/DividingLine';

import styles from './CartTotal.module.scss';

export const CartTotal: React.FC<{
  totalPrice: number;
  cartItemCount: number;
}> = ({ totalPrice, cartItemCount }) => {
  return (
    <div className={styles.Cart__total}>
      <h2 className={styles.total__price}>${totalPrice}</h2>
      <p className={styles.total__text}>Total for {cartItemCount} items</p>
      <DividingLine />
      <button className={styles.total__button}>Checkout</button>
    </div>
  );
};
