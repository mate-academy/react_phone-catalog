import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './CartItem.module.scss';

export interface CartItemType {
  product: Product;
  quantity: number;
}

interface Props {
  item: CartItemType;
  // В будущем передадим реальные функции из CartContext
  onQuantityChange?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const { product, quantity } = item;
  const { itemId, category, name, price, image } = product;

  const handleDecrease = () => {
    if (quantity > 1 && onQuantityChange) {
      onQuantityChange(itemId, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (onQuantityChange) {
      onQuantityChange(itemId, quantity + 1);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(itemId);
    }
  };

  const totalPrice = price * quantity;

  return (
    <div className={styles.cartItem}>
      {/* 1. Кнопка удаления */}
      <button
        type="button"
        className={styles.removeBtn}
        onClick={handleRemove}
        aria-label="Remove item"
      >
        <img
          src="img/icons/close.svg"
          alt="Remove"
          className={styles.removeIcon}
        />
      </button>

      {/* 2. Изображение и Название */}
      <Link to={`/${category}/${itemId}`} className={styles.productInfo}>
        <div className={styles.imageContainer}>
          <img src={image} alt={name} className={styles.image} />
        </div>
        <p className={styles.title}>{name}</p>
      </Link>

      <div className={styles.actions}>
        {/* 3. Изменение количества */}
        <div className={styles.quantityControls}>
          <button
            type="button"
            className={styles.quantityBtn}
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            type="button"
            className={styles.quantityBtn}
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* 4. Цена */}
        <div className={styles.priceBlock}>
          <span className={styles.price}>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};
