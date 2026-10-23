import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../types/CartItem';
import { useCart } from '../../context/CartContext/CartContext';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, quantity } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.itemId, quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(product.itemId, quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(product.itemId);
  };

  return (
    <div className={styles.item}>
      {/* Кнопка видалення */}
      <button
        type="button"
        onClick={handleRemove}
        className={styles.removeBtn}
        aria-label="Remove item"
      >
        ×
      </button>

      {/* Зображення */}
      <Link to={`/product/${product.itemId}`} className={styles.imageWrapper}>
        <img
          src={`/${product.image}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      {/* Назва */}
      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      {/* Лічильник кількості */}
      <div className={styles.quantityControl}>
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className={styles.quantityBtn}
        >
          -
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button
          type="button"
          onClick={handleIncrease}
          className={styles.quantityBtn}
        >
          +
        </button>
      </div>

      {/* Загальна ціна за цей товар */}
      <div className={styles.price}>${product.price * quantity}</div>
    </div>
  );
};
