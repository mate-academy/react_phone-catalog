import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';
import { CartItem as CartItemType } from '../../../../types/CartItem';
import { CartContext } from '../../../../store/CartContext';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  const productLink = `/product/${item.product.itemId}`;

  return (
    <li className={styles.cartItem}>
      <div className={styles.cartItemTop}>
        <button
          type="button"
          className={styles.cartItemClose}
          aria-label="Remove from cart"
          onClick={() => {
            removeFromCart(item.id);
          }}
        >
          <span className={styles.cartItemCloseIcon} />
        </button>

        <Link to={productLink} className={styles.cartItemPhoto}>
          <img
            src={item.product.image}
            alt={item.product.name}
            className={styles.cartItemImage}
          />
        </Link>

        <Link to={productLink} className={styles.cartItemTitle}>
          {item.product.name}
        </Link>
      </div>

      <div className={styles.cartItemBottom}>
        <div className={styles.cartItemQuantity}>
          <button
            type="button"
            className={styles.cartItemButton}
            disabled={item.quantity === 1}
            aria-label="Decrease quantity"
            onClick={() => {
              updateQuantity(item.id, item.quantity - 1);
            }}
          >
            <span className={styles.cartItemIconMinus} />
          </button>
          <span className={styles.cartItemCount}>{item.quantity}</span>

          <button
            type="button"
            className={styles.cartItemButton}
            aria-label="Increase quantity"
            onClick={() => {
              updateQuantity(item.id, item.quantity + 1);
            }}
          >
            <span className={styles.cartItemIconPlus} />
          </button>
        </div>
        <p className={styles.cartItemPrice}>
          ${item.product.price * item.quantity}
        </p>
      </div>
    </li>
  );
};
