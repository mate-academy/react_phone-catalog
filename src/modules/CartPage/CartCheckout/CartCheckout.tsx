import { useCart } from '../../../hooks/useCartContext';
import { useStateContext } from '../../../hooks/useStateContext';

import styles from './CartCheckout.module.scss';

export const CartCheckout = () => {
  const { cart } = useCart();
  const { setIsOpenModal } = useStateContext();

  const totalAmount = cart
    .map(item => item.product.price * item.quantity)
    .reduce((acc, current) => acc + current);

  return (
    <section className={styles['cart-checkout']}>
      <h2 className={styles['cart-checkout__total-amount']}>${totalAmount}</h2>

      <p className={styles['cart-checkout__total-items']}>
        Total for {cart.length} items
      </p>

      <hr className={styles['cart-checkout__line']} />

      <button
        className={styles['cart-checkout__button']}
        onClick={() => setIsOpenModal(true)}
      >
        Checkout
      </button>
    </section>
  );
};
