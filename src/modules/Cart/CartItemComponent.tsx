import React from 'react';
import styles from './Cart.module.scss';
import { useCart } from '../CartFavContext/CartContext';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CartProduct } from './Cart';
type CartItemProps = {
  item: CartProduct;
};
const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { reduceQuantity, increaseQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.cartItem}>
      <button
        onClick={() => removeFromCart(item.itemId)}
        className={styles.cartItem__removeButton}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M11.5293 3.52863C11.7896 3.26833 12.2113 3.26844 12.4717 3.52863C12.732 3.78897 12.732 4.21066 12.4717 4.47101L8.94238 7.99933L12.4717 11.5286C12.732 11.789 12.732 12.2107 12.4717 12.471C12.2113 12.7314 11.7896 12.7314 11.5293 12.471L8 8.94171L4.47168 12.471C4.21133 12.7314 3.78965 12.7314 3.5293 12.471C3.26911 12.2106 3.269 11.7889 3.5293 11.5286L7.05762 7.99933L3.5293 4.47101C3.26911 4.21065 3.269 3.78892 3.5293 3.52863C3.78959 3.26833 4.21132 3.26844 4.47168 3.52863L8 7.05695L11.5293 3.52863Z"
            fill="#B4BDC4"
          />
        </svg>
      </button>
      <Link
        to={`/${item.category}/${item.itemId}`}
        className={styles.cartItem__imageWrapper}
      >
        <img src={item.image} alt={item.name} />
      </Link>
      <div className={styles.cartItem__nameWrapper}>
        <span className={styles.cartItem__name}>{item.name}</span>
      </div>
      <div className={styles.cartItem__quantityBlock}>
        {/* Кнопка МІНУС */}
        <button
          className={classNames(styles.cartItem__quantityButton)}
          disabled={item.quantity <= 1}
          onClick={() => reduceQuantity(item.itemId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.66602 7.99998C2.66602 7.63179 2.96449 7.33331 3.33268 7.33331H12.666C13.0342 7.33331 13.3327 7.63179 13.3327 7.99998C13.3327 8.36817 13.0342 8.66665 12.666 8.66665H3.33268C2.96449 8.66665 2.66602 8.36817 2.66602 7.99998Z"
              fill="#B4BDC4"
            />
          </svg>
        </button>

        <span className={styles.cartItem__quantity}>{item.quantity}</span>

        {/* Кнопка ПЛЮС */}
        <button
          className={styles.cartItem__quantityButton}
          onClick={() => increaseQuantity(item.itemId)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.99902 2.66669C8.36721 2.66669 8.66602 2.96549 8.66602 3.33368V7.33368H12.666C13.0341 7.33368 13.3328 7.63165 13.333 7.99969C13.333 8.36788 13.0342 8.66669 12.666 8.66669H8.66602V12.6667C8.66602 13.0349 8.36721 13.3337 7.99902 13.3337C7.63098 13.3335 7.33301 13.0348 7.33301 12.6667V8.66669H3.33301C2.96482 8.66669 2.66602 8.36788 2.66602 7.99969C2.66619 7.63165 2.96493 7.33368 3.33301 7.33368H7.33301V3.33368C7.33301 2.9656 7.63098 2.66686 7.99902 2.66669Z"
              fill="#313237"
            />
          </svg>
        </button>
      </div>
      <div className={styles.cartItem__positionPriceWrapper}>
        <span className={styles.cartItem__positionPrice}>
          ${(item.price * item.quantity).toFixed(0)}
        </span>
      </div>
    </div>
  );
};

export default CartItemComponent;
