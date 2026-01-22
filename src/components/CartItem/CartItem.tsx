import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { CartItem as CartItemType } from '../../types/CartItem';
import { useCart } from '../../context/CartContext';
import styles from './CartItem.module.scss';

type Props = {
  cartItem: CartItemType;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const { id, name, price, image, quantity, itemId, category } = cartItem;
  const productCategory = category || 'phones';

  return (
    <div className={styles.cartItem} data-cy="cartItem">
      {/* 1. Krzyżyk (SVG inline - zawsze zadziała) */}
      <div className={styles.removeWrapper}>
        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => removeFromCart(id)}
          data-cy="cartDeleteButton"
          aria-label="Remove item"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12"
              stroke="#B4BDC3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 4L12 12"
              stroke="#B4BDC3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 2. Zdjęcie */}
      <Link to={`/${productCategory}/${itemId}`} className={styles.imageLink}>
        <img src={`/${image}`} alt={name} className={styles.image} />
      </Link>

      {/* 3. Nazwa */}
      <Link to={`/${productCategory}/${itemId}`} className={styles.nameLink}>
        {name}
      </Link>

      {/* 4. Licznik (- 1 +) */}
      <div className={styles.quantityWrapper}>
        <button
          type="button"
          className={cn(styles.quantityBtn, {
            [styles.disabled]: quantity === 1,
          })}
          onClick={() => decreaseQuantity(id)}
          disabled={quantity === 1}
        >
          {/* Minus SVG */}
          <svg
            width="10"
            height="2"
            viewBox="0 0 10 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className={styles.quantity} data-cy="productQauntity">
          {quantity}
        </span>

        <button
          type="button"
          className={styles.quantityBtn}
          onClick={() => increaseQuantity(id)}
        >
          {/* Plus SVG */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1V9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 5H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 5. Cena */}
      <div className={styles.price}>${price}</div>
    </div>
  );
};
