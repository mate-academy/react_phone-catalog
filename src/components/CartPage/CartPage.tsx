import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getAssetUrl } from '../../utils/getAssetUrl';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Cart</h1>
        <p className={styles.empty}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      <div className={styles.content}>
        <div className={styles.list}>
          {items.map(item => (
            <div key={item.product.itemId} className={styles.cartItem}>
              <div className={styles.cartItemInfo}>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.product.itemId)}
                >
                  ✕
                </button>

                <Link
                  to={`/product/${item.product.itemId}`}
                  className={styles.cartItemImageLink}
                >
                  <img
                    src={getAssetUrl(item.product.image)}
                    alt={item.product.name}
                    className={styles.cartItemImage}
                  />
                </Link>

                <Link
                  to={`/product/${item.product.itemId}`}
                  className={styles.cartItemTitle}
                >
                  {item.product.name}
                </Link>
              </div>

              <div className={styles.cartItemAction}>
                <div className={styles.controls}>
                  <button
                    className={styles.controlButton}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      updateQuantity(item.product.itemId, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.controlButton}
                    onClick={() =>
                      updateQuantity(item.product.itemId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <span className={styles.cartItemPrice}>
                  ${item.product.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryTotal}>
            <span className={styles.summaryPrice}>${totalAmount}</span>
            <span className={styles.summaryText}>
              Total for {totalQuantity} items
            </span>
          </div>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
