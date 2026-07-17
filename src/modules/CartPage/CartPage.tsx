import { Icon } from '../shared/components/Icon';
import { useCart } from '../shared/context';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const {
    cart,
    cartCount,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className={`container ${styles.empty}`}>
        <h1 className={styles.title}>Cart</h1>
        <p>Your cart is empty</p>
        <img src="img/cart-is-empty.png" alt="" className={styles.emptyImage} />
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.content}>
        <ul className={styles.list}>
          {cart.map(item => (
            <li key={item.id} className={styles.item}>
              <button
                type="button"
                className={styles.remove}
                aria-label="Remove item"
                onClick={() => removeFromCart(item.id)}
              >
                <Icon name="close" />
              </button>

              <img
                src={item.product.image}
                alt={item.product.name}
                className={styles.image}
              />

              <p className={styles.name}>{item.product.name}</p>

              <div className={styles.quantity}>
                <button
                  type="button"
                  className={styles.qtyButton}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <Icon name="minus" />
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  className={styles.qtyButton}
                  aria-label="Increase quantity"
                  onClick={() => increaseQuantity(item.id)}
                >
                  <Icon name="plus" />
                </button>
              </div>

              <p className={styles.price}>
                ${item.product.price * item.quantity}
              </p>
            </li>
          ))}
        </ul>

        <div className={styles.checkout}>
          <p className={styles.total}>${totalPrice}</p>
          <p className={styles.totalLabel}>Total for {cartCount} items</p>
          <div className={styles.divider} />
          <button
            type="button"
            className={styles.checkoutButton}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
