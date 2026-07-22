import { BackButton } from '../shared/components/BackButton';
import styles from './CartPage.module.scss';
import { useShop } from '../../context/ShopContext';
import { CartItem } from './components/Cartitem';
import { CartSummary } from './components/CartSummary';
import classNames from 'classnames';

export const CartPage = () => {
  const { cartItems, clearCart } = useShop();

  const totalItems = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
    0,
  );

  const handleCheckout = () => {
    const shouldClearCart = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClearCart) {
      clearCart();
    }
  };

  return (
    <div className={classNames(styles.cartPage, 'container')}>
      <BackButton />

      <h1 className={styles.cartPage__title}>Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.cartPage__empty}>Your cart is empty</p>
      ) : (
        <div className={styles.cartPage__content}>
          <ul className={styles.cartPage__list}>
            {cartItems.map(cartItem => (
              <li
                className={styles.cartPage__listItem}
                key={cartItem.product.id}
              >
                <CartItem cartItem={cartItem} />
              </li>
            ))}
          </ul>

          <div className={styles.cartPage__summary}>
            <CartSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
};
