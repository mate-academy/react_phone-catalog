import { useCart } from '../../../../context/cart/useCart';
import s from './CartTotal.module.scss';

export const CartTotal = () => {
  const { totalPrice, totalCount, clearCart } = useCart();

  return (
    <div className={s.totalWrapper}>
      <div className={s.total}>
        <p className={s.totalAmount}>${totalPrice}</p>
        <span className={s.totalInfo}>Total for {totalCount} items</span>
      </div>

      <span className={s.divider}></span>

      <button
        className={s.checkoutButton}
        onClick={() => clearCart()}
        type="button"
      >
        Checkout
      </button>
    </div>
  );
};
