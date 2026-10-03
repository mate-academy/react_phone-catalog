import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { useCart } from '../../context';
import { BackButton } from '../BackButton';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalCount,
    totalAmount,
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancelCheckout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.backWrapper}>
        <BackButton />
      </div>

      <h1 className={styles.title}>Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>Your cart is empty</p>
          <Link to="/phones" className={styles.continueShoppingBtn}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {cartItems.map(({ id, quantity, product }) => (
              <div key={id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(id)}
                    aria-label="Remove item"
                  >
                    <img
                      src="img/icons/Close.svg"
                      alt="Remove"
                      className={styles.removeIcon}
                    />
                  </button>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.imageLink}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.itemImage}
                    />
                  </Link>

                  <Link
                    to={`/product/${product.itemId}`}
                    className={styles.itemTitle}
                  >
                    {product.name}
                  </Link>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.quantityControls}>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => decreaseQuantity(id)}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => increaseQuantity(id)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.itemPrice}>
                    ${product.price * quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summaryWrapper}>
            <div className={styles.summaryBox}>
              <div className={styles.totalPrice}>${totalAmount}</div>
              <div className={styles.totalCount}>
                Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </div>
              <div className={styles.divider} />
              <button
                type="button"
                className={styles.checkoutBtn}
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCancelCheckout}>
          <div
            className={styles.modalContent}
            onClick={e => e.stopPropagation()}
          >
            <p className={styles.modalText}>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </p>
            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.modalCancelBtn}
                onClick={handleCancelCheckout}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.modalConfirmBtn}
                onClick={handleConfirmCheckout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
