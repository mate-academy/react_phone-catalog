import styles from './CartPage.module.scss';

import { useMemo } from 'react';

import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';
import {
  useUserActions,
  useUserActionsDispatch,
} from '../../context/useUserActions';
import cartIsEmpty from '../../images/cart-is-empty.png';

export const CartPage: React.FC = () => {
  const { cart } = useUserActions();
  const dispatch = useUserActionsDispatch();

  const totalSum = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartPage__container}>
        <div className={styles.cartPage__back}>
          <BackButton />
        </div>

        <h1 className={styles.cartPage__heading}>Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.cartPage__message}>
            <h2 className={styles.cartPage__messageText}>Your cart is empty</h2>
            <img
              className={styles.cartPage__messageImage}
              src={cartIsEmpty}
              alt="Your cart is empty"
            />
          </div>
        ) : (
          <div className={styles.cartPage__content}>
            <div className={styles.cartPage__items}>
              {cart.map(cartItem => (
                <CartItem key={cartItem.product.id} item={cartItem} />
              ))}
            </div>

            <div className={styles.cartPage__summary}>
              <div className={styles.cartPage__total}>
                <span className={styles.cartPage__totalSum}>${totalSum}</span>
                <span className={styles.cartPage__totalText}>
                  {`Total for ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
                </span>
              </div>
              <button
                className={styles.cartPage__checkoutButton}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
