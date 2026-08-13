import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem, useApp } from '../../context/AppContext';
import styles from './CartItemElement.module.scss';

interface Props {
  item: CartItem;
}

export const CartItemElement: React.FC<Props> = ({ item }) => {
  const { removeFromCart, changeQuantity } = useApp();
  const { id, product, quantity } = item;

  const productPath = `/${product.category}/${product.itemId || product.id}`;

  return (
    <div className={styles.item}>
      {/* 1. Кнопка видалення */}
      <button
        type="button"
        className={styles.item__remove}
        onClick={() => removeFromCart(id)}
        aria-label="Remove item"
      >
        <img
          src="/react_phone-catalog/img/icons/cart-item.svg"
          alt="Remove"
          className={styles.item__icon}
        />
      </button>

      <Link to={productPath} className={styles.item__productLink}>
        {/* Зображення самого телефону */}
        <div className={styles.item__imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.item__image}
          />
        </div>

        {/* Текстова назва гаджета */}
        <span className={styles.item__title}>{product.name}</span>
      </Link>

      {/* 4. Керування кількістю (- 1 +) */}
      <div className={styles.item__quantityControl}>
        {/* Кнопка "Мінус" */}
        <button
          type="button"
          className={styles.item__btn}
          onClick={() => changeQuantity(id, 'decrement')}
          disabled={quantity <= 1} // Блокуємо кнопку, якщо товар всього один
        >
          -
        </button>

        {/* Поточна кількість штук товару з контексту */}
        <span className={styles.item__count}>{quantity}</span>

        {/* Кнопка "Плюс" */}
        <button
          type="button"
          className={styles.item__btn}
          onClick={() => changeQuantity(id, 'increment')}
        >
          +
        </button>
      </div>

      <span className={styles.item__price}>
        ${Number(product.price) * quantity}
      </span>
    </div>
  );
};
