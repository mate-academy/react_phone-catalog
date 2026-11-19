import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import { getPublicUrl } from '../../utils/getPublicUrl';

export const CartPage = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear your cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  return (
    <main className={styles.main}>
      <button
        className={styles.backButton}
        type="button"
        onClick={() => navigate(-1)}
      >
        <span>‹</span>
        Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            className={`${styles.emptyImage} ${styles.emptyImageLight}`}
            src={getPublicUrl('/img/cart-is-empty.png')}
            alt="Empty shopping cart"
          />

          <img
            className={`${styles.emptyImage} ${styles.emptyImageDark}`}
            src={getPublicUrl('/img/cart-is-empty-dark.png')}
            alt="Empty shopping cart"
          />

          <p className={styles.emptyMessage}>Your cart is empty</p>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          <div className={styles.cartItems}>
            {cartItems.map(({ product, quantity }) => (
              <div className={styles.cartItem} key={product.id}>
                <button
                  className={styles.removeButton}
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  aria-label={`Remove ${product.name}`}
                >
                  ×
                </button>

                <img
                  className={styles.productImage}
                  src={getPublicUrl(product.image)}
                  alt={product.name}
                />

                <p className={styles.productName}>
                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.productLink}
                  >
                    {product.name}
                  </Link>
                </p>

                <div className={styles.quantityControls}>
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(product.id)}
                    disabled={quantity === 1}
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(product.id)}
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                </div>

                <span className={styles.itemPrice}>
                  ${product.price * quantity}
                </span>
              </div>
            ))}
          </div>

          <aside className={styles.summary}>
            <h2 className={styles.totalPrice}>${totalPrice}</h2>

            <p className={styles.totalItems}>Total for {totalQuantity} items</p>

            <div className={styles.summaryDivider} />

            <button
              className={styles.checkoutButton}
              type="button"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
};
