import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './CartPage.module.scss';

import { useCart } from '../../context/CartContext';
import { getAssetUrl } from '../../utils/helpers';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalQuantity,
    totalPrice,
  } = useCart();

  useEffect(() => {
    document.title = 'Cart | Gadgets';
  }, []);

  const handleCheckout = () => {
    const confirmClear = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmClear) {
      clearCart();
    }
  };

  return (
    <div className={`${styles.cartPage} container`} data-testid="cart-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        <i className="fa-solid fa-chevron-left" />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            src={getAssetUrl('img/cart-is-empty.png')}
            alt="Cart is empty"
            className={styles.emptyImage}
          />
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyText}>
            But it&apos;s never too late to fix it!
          </p>
          <Link to="/" className={styles.shopBtn}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cartItems.map(item => {
              const { id, quantity, product } = item;

              return (
                <div
                  key={id}
                  className={styles.cartItem}
                  data-testid="cart-item"
                >
                  <button
                    type="button"
                    onClick={() => removeFromCart(id)}
                    className={styles.removeBtn}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.imageLink}
                  >
                    <img src={getAssetUrl(product.image)} alt={product.name} />
                  </Link>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.nameLink}
                  >
                    {product.name}
                  </Link>

                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(id, quantity - 1)}
                      disabled={quantity <= 1}
                      className={styles.qtyBtn}
                      aria-label="Decrease quantity"
                    >
                      <i className="fa-solid fa-minus" />
                    </button>
                    <span className={styles.qtyValue}>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(id, quantity + 1)}
                      className={styles.qtyBtn}
                      aria-label="Increase quantity"
                    >
                      <i className="fa-solid fa-plus" />
                    </button>
                  </div>

                  <div className={styles.price}>
                    ${product.price * quantity}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.summaryCard}>
            <div className={styles.totalPrice}>${totalPrice}</div>
            <div className={styles.totalCount}>
              Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className={styles.checkoutBtn}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
