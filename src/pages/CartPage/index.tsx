import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from './CartPage.module.scss';
import { EmptyState } from '../../components/EmptyState';

export const CartPage = () => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const {
    cartItems,
    removeFromCart,
    changeItemQuantity,
    totalAmount,
    clearCart,
  } = context;

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return <EmptyState message="Your cart is empty" />;
  }

  return (
    <div className={styles.cartPage}>
      <h1>Shopping cart</h1>
      <div className={styles.cartList}>
        {cartItems.map(item => (
          <div key={item.product.id} className={styles.cartItem}>
            <Link
              to={`/product/${item.product.id}`}
              className={styles.imageLink}
            >
              <img src={item.product.images[0]} alt={item.product.name} />
            </Link>
            <div className={styles.productDetails}>
              <Link
                to={`/product/${item.product.id}`}
                className={styles.productTitle}
              >
                {item.product.name}
              </Link>
              <p>
                {item.product.color} · {item.product.capacity}
              </p>
              <div className={styles.quantityRow}>
                <button
                  type="button"
                  onClick={() =>
                    changeItemQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    changeItemQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <p className={styles.itemPrice}>
                ${item.product.priceDiscount * item.quantity}
              </p>
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => removeFromCart(item.product.id)}
              aria-label="Remove from cart"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className={styles.summary}>
        <div>
          <p>
            Total quantity:{' '}
            <strong>
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </strong>
          </p>
          <p>
            Total amount: <strong>${totalAmount}</strong>
          </p>
        </div>
        <button
          type="button"
          className={styles.checkoutButton}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
