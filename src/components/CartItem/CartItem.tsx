import React from 'react';
import { useCart } from '../../context/CartContext';
import { CartItem as CartItemType } from '../../types/CartItem';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className={styles.cartItem}>
      {/* Remove button */}
      <button className={styles.removeButton} onClick={handleRemove} aria-label="Remove item">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Product image */}
      <div className={styles.imageContainer}>
        <img src={item.product.image} alt={item.product.name} className={styles.image} />
      </div>

      {/* Product info */}
      <div className={styles.info}>
        <h3 className={styles.name}>{item.product.name}</h3>
      </div>

      {/* Right section: Quantity controls + Price on same line */}
      <div className={styles.rightSection}>
        {/* Quantity controls */}
        <div className={styles.quantityControls}>
          <button
            className={styles.quantityButton}
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <span className={styles.quantity}>{item.quantity}</span>

          <button
            className={styles.quantityButton}
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3V13M3 8H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

      {/* Price */}
      <div className={styles.price}>${itemTotal}</div>
      </div>
    </div>
  );
};
