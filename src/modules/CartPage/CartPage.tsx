import styles from './CartPage.module.scss';
import { useCart } from '../shared/context/CartContext';
import { CartItem } from './components/CartItem';
import { CartCheckout } from './components/CartCheckout';
import emptyCart from '/img/cart-is-empty.png';
import { BackButton } from '../../components/BackButton';
import { EmptyState } from '../../components/EmptyState';

export const CartPage = () => {
  const { cartItems, clearCart } = useCart();

  return (
    <div className="container">
      <BackButton />

      <h1>Cart</h1>

      <div className={styles.content}>
        {cartItems.length > 0 ? (
          <>
            <div className={styles.itemsBlock}>
              {cartItems.map(item => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </div>

            <CartCheckout cartItems={cartItems} clearCart={clearCart} />
          </>
        ) : (
          <EmptyState image={emptyCart} message="Your cart is empty" />
        )}
      </div>
    </div>
  );
};
