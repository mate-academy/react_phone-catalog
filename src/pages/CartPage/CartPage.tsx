import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalCount,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
    clearCart();
  };

  return (
    <div className={styles.page}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        ‹ Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cart.length > 0 ? (
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className={styles.cartItem}>
                <div className={styles.itemMain}>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Remove item"
                  >
                    <img src="/img/icons/close.svg" alt="Close" />
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.itemImage}
                  />

                  <Link
                    to={`/${product.category}/${product.itemId || product.phoneId || product.id}`}
                    className={styles.itemTitle}
                  >
                    {product.name}
                  </Link>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.quantityGroup}>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className={styles.quantityCount}>{quantity}</span>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <span className={styles.itemPrice}>
                    ${product.price * quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalBlock}>
            <span className={styles.totalPrice}>${totalPrice}</span>
            <span className={styles.totalItems}>
              Total for {totalCount} items
            </span>
            <div className={styles.divider} />
            <button
              type="button"
              className={styles.checkoutBtn}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.emptyMessage}>
          {isCheckoutModalOpen
            ? 'We are sorry, but checkout is not implemented yet. ' +
              'Your cart has been cleared.'
            : 'Your cart is empty.'}
        </div>
      )}
    </div>
  );
};
