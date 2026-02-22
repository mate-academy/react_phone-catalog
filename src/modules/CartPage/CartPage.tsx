import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { CartContext } from '../../context/CartContext';
import { BackButton } from '../../components/BackButton';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useContext(CartContext);

  const handleCheckout = () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.page}>
      <BackButton />

      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.empty}>
          <img
            src="img/cart-is-empty.png"
            alt="Cart is empty"
            className={styles.emptyImage}
          />
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.cartItemLeft}>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <img src="img/icons/close.svg" alt="Remove" />
                  </button>

                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className={styles.cartItemImage}
                  />

                  <Link
                    to={`/product/${item.product.itemId}`}
                    className={styles.cartItemName}
                  >
                    {item.product.name}
                  </Link>
                </div>

                <div className={styles.cartItemRight}>
                  <div className={styles.quantity}>
                    <button
                      type="button"
                      className={styles.quantityButton}
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <img src="img/icons/minus.svg" alt="Decrease" />
                    </button>

                    <span className={styles.quantityValue}>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <img src="img/icons/plus.svg" alt="Increase" />
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
            <p className={styles.totalPrice}>${totalPrice}</p>
            <p className={styles.totalCount}>
              {`Total for ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            </p>
            <hr className={styles.divider} />
            <button
              type="button"
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
