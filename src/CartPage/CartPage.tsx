import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import styles from './CartPage.module.scss';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

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
    <main className={styles.page}>
      <div className={styles.container}>
        <button className={styles.back} onClick={() => history.back()}>
          <i className="fa-solid fa-chevron-left" />
          Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <img
              src="/img/cart-is-empty.png"
              alt="Cart is empty"
              className={styles.emptyImg}
            />
            <p className={styles.emptyText}>Your cart is empty</p>
            <Link to="/" className={styles.shopLink}>
              Start shopping
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.items}>
              {cart.map(item => (
                <article key={item.id} className={styles.item}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>

                  <Link
                    to={`/${item.product.category}/${item.product.itemId}`}
                    className={styles.itemImageLink}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className={styles.itemImage}
                    />
                  </Link>

                  <Link
                    to={`/${item.product.category}/${item.product.itemId}`}
                    className={styles.itemName}
                  >
                    {item.product.name}
                  </Link>

                  <div className={styles.itemControls}>
                    <div className={styles.qty}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => decrement(item.id)}
                        disabled={item.quantity === 1}
                        aria-label="Decrease quantity"
                      >
                        <i className="fa-solid fa-minus" />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => increment(item.id)}
                        aria-label="Increase quantity"
                      >
                        <i className="fa-solid fa-plus" />
                      </button>
                    </div>
                    <span className={styles.itemPrice}>
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.summary}>
              <div className={styles.summaryTotal}>
                <span className={styles.summaryPrice}>${totalPrice}</span>
                <span className={styles.summaryLabel}>
                  Total for {totalItems} item{totalItems !== 1 ? 's' : ''}
                </span>
              </div>
              <div className={styles.summaryDivider} />
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};
