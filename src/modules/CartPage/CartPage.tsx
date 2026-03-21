import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Modal } from '../../components/Modal';
import styles from './CartPage.module.scss';

const IconClose: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M1 1l12 12M13 1L1 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  const [showModal, setShowModal] = useState(false);

  if (items.length === 0) {
    return (
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Cart</h1>
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🛒</span>
          <p className={styles.emptyTitle}>Your cart is empty</p>
          <p className={styles.emptyHint}>
            Add some products and they will appear here
          </p>
          <Link to="/" className={styles.emptyBtn}>
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>Cart</h1>

      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map(({ product, quantity }) => (
            <div key={product.id} className={styles.item}>
              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(product.id)}
                aria-label={`Remove ${product.name}`}
              >
                <IconClose />
              </button>

              <Link
                to={`/${product.category}/${product.itemId}`}
                className={styles.imgLink}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.img}
                />
              </Link>

              <Link
                to={`/${product.category}/${product.itemId}`}
                className={styles.name}
              >
                {product.name}
              </Link>

              <div className={styles.qty}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  aria-label="Increase quantity"
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

        <div className={styles.summary}>
          <div className={styles.summaryBox}>
            <p className={styles.totalPrice}>${totalPrice}</p>
            <p className={styles.totalLabel}>
              Total for {totalItems === 1 ? '1 item' : `${totalItems} items`}
            </p>

            <div className={styles.summaryDivider} />

            <button
              className={styles.checkoutBtn}
              onClick={() => setShowModal(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          title="Checkout"
          // eslint-disable-next-line max-len
          message="Checkout is not implemented yet. Do you want to clear the Cart?"
          onConfirm={() => {
            clearCart();
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </main>
  );
};
