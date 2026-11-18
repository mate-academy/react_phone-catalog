import { useStateContext } from '../../hooks/useStateContext';
import { useCart } from '../../hooks/useCartContext';

import { ToBack } from '../../components/ToBack';
import { CartItems } from './CartItems';
import { CartCheckout } from './CartCheckout';
import { CartEmpty } from './CartEmpty';
import { Modal } from '../../components/Modal';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cart } = useCart();
  const { isOpenModal } = useStateContext();

  return (
    <section className={styles['cart-page']}>
      <div className={styles['cart-page__wrapper']}>
        <ToBack />

        <h1 className={styles['cart-page__title']}>Cart</h1>

        {cart.length > 0 ? (
          <div className={styles['cart-page__content']}>
            <>
              <CartItems carts={cart} />
              <CartCheckout />
            </>
          </div>
        ) : (
          <CartEmpty />
        )}

        {isOpenModal && <Modal />}
      </div>
    </section>
  );
};
