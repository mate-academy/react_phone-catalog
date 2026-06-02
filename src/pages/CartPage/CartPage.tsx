import styles from './CartPage.module.scss';
import { ButtonBack } from '../../components/ButtonBack';
import { useCart } from './context/CartContext';
import { CartItem } from './CartItem/CartItem';

export const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <ButtonBack />
        <h1 className={styles.title}>Cart</h1>
        {cartItems.length !== 0 ? (
          <>
            <div className={styles.items}>
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} onRemove={removeFromCart} />
              ))}
            </div>
            <div className={styles.checkout}>
              <p className={styles.totalPrice}>${totalPrice}</p>
              <p className={styles.count}>{`Total for ${totalCount} items`}</p>

              <button
                className={styles.checkoutButton}
                onClick={() => {
                  const confirmed = confirm(
                    // eslint-disable-next-line max-len
                    'Checkout is not implemented yet. Do you want to clear the Cart?',
                  );

                  if (confirmed) {
                    clearCart();
                  }
                }}
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <h1 className={styles.emptyTitle}>Your cart is empty</h1>
            <img
              src="/img/cart-is-empty.png"
              alt="cart is empty"
              className={styles.emptyImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
