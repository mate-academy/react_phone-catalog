import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import arrowLeft from './components/img/arrow-left.png';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  return (
    <div className={styles.page}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <img
          src={arrowLeft}
          className={styles.backButtonIcon}
          alt="arrowLeft"
        />
        Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {!cartItems.length ? (
        <p className={styles.emptyState}>Your cart is empty</p>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {cartItems.map(({ product, quantity }) => (
              <article key={product.itemId} className={styles.item}>
                <div className={styles.itemTop}>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.itemId)}
                    className={styles.removeButton}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    x
                  </button>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.imageLink}
                  >
                    <img
                      src={`/${product.image}`}
                      alt={product.name}
                      className={styles.image}
                    />
                  </Link>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.nameLink}
                  >
                    {product.name}
                  </Link>
                </div>

                <div className={styles.itemBottom}>
                  <div className={styles.quantityControls}>
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(product.itemId)}
                      disabled={quantity === 1}
                      className={styles.quantityButton}
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      -
                    </button>

                    <span className={styles.quantityValue}>{quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(product.itemId)}
                      className={styles.quantityButton}
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      +
                    </button>
                  </div>

                  <p className={styles.price}>${product.price * quantity}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className={styles.summary}>
            <h2 className={styles.totalPrice}>${totalPrice}</h2>
            <p
              className={styles.totalItems}
            >{`Total for ${totalQuantity} items`}</p>
            <div className={styles.summaryDivider} />
            <button
              type="button"
              className={styles.checkoutButton}
              onClick={() => {
                const shouldClear = window.confirm(
                  // eslint-disable-next-line max-len
                  'Checkout is not implemented yet. Do you want to clear the Cart?',
                );

                if (shouldClear) {
                  clearCart();
                }
              }}
            >
              Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};
