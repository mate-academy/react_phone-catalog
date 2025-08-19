import React from 'react';
import { ProductForCard } from '../../../../types/Product/Product';
import { ICON_PATHS } from '../../../../shared/constants/IconPaths';

import styles from './CartItem.module.scss';

type Props = {
  item: ProductForCard;
  onRemove: (productId: number) => void;
  onQuantityChange: (productId: number, newQuantity: number) => void;
};

export const CartItem: React.FC<Props> = ({
  item,
  onRemove,
  onQuantityChange,
}) => {
  const quantity = item.quantity || 1;

  const handleDecrease = () => {
    onQuantityChange(item.id, quantity - 1);
  };

  const handleIncrease = () => {
    onQuantityChange(item.id, quantity + 1);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className={styles.cartItem}>
      <button
        className={styles.cartItem__removeButton}
        onClick={handleRemove}
        aria-label="Remove item"
      >
        <img
          src={ICON_PATHS.close}
          alt="Remove item"
          className={styles.cartItem__removeIcon}
        />
      </button>

      <div className={styles.cartItem__imageContainer}>
        <img
          src={item.image}
          alt={item.name}
          className={styles.cartItem__image}
        />
      </div>

      <div className={styles.cartItem__productInfo}>
        <h3 className={styles.cartItem__name}>{item.name}</h3>
      </div>

      <div className={styles.cartItem__quantityControls}>
        <button
          className={styles.cartItem__quantityButton}
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          <img
            src={ICON_PATHS.minus}
            alt="minus one item"
            className={`${styles.cartItem__quantityControlIcon} ${
              quantity <= 1 ? styles.cartItem__quantityControlIconDisabled : ''
            }`}
          />
        </button>

        <span className={styles.cartItem__quantity}>{quantity}</span>

        <button
          className={styles.cartItem__quantityButton}
          onClick={handleIncrease}
        >
          <img
            src={ICON_PATHS.plus}
            alt="plus one item"
            className={styles.cartItem__quantityControlIcon}
          />
        </button>
      </div>

      <div className={styles.cartItem__price}>${item.price}</div>
    </div>
  );
};
