import { useEffect } from 'react';
import { GoBackButton } from '../../components/GoBackButton';
import styles from './CartPage.module.scss';
import { CartItem } from '../../components/CartItem';
import { useAppDispatch, useAppSelector } from '../../hooks/helperToolkit';
import { loadCardFromStorage } from '../../slices/cartSlice';
import { CheckoutProcess } from '../../components/Checkout';
import emptyCartImage from '../../../public/img/cart-is-empty.png';
import { EmptyState } from '../../components/EmptyState';
import { setGlobalLoading } from '../../slices/uiSlice';
import { useCheckoutState } from '../../hooks/useCheckoutState';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { loading, items, itemsCount } = useAppSelector(state => state.cart);
  const { isCheckoutOpen, openCheckout, closeCheckout } = useCheckoutState();

  useEffect(() => {
    dispatch(loadCardFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      dispatch(setGlobalLoading(false));
    }
  }, [loading]);

  const totalPrice = items.reduce((acc, item) => {
    if (item.price && item.quantity) {
      return acc + item.price * item.quantity;
    }

    return acc;
  }, 0);

  return (
    <div className={styles.cart}>
      <GoBackButton />

      <h1 className={styles.cartTitle}>Cart</h1>
      {itemsCount === 0 ? (
        <EmptyState
          image={emptyCartImage}
          title="Your cart is snoozing..."
          description="Time to wake it up with some items!"
        />
      ) : (
        <div className={styles.cartContentWrapper}>
          <div className={styles.cartItemList}>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className={styles.cartSummary}>
            <h2 className={styles.totalPrice}>${totalPrice}</h2>

            <span className={styles.totalItems}>
              Total for {itemsCount} items
            </span>

            <hr className={styles.line} />

            <button className={styles.checkoutButton} onClick={openCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}

      {isCheckoutOpen && <CheckoutProcess onClose={closeCheckout} />}
    </div>
  );
};
