import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../../../types';
import { CartContext } from '../../../../context/CartContext';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const { removeFromCart, changeQuantity } = useContext(CartContext);
  const { id, quantity, product } = item;
  const productLink = `/product/${product.itemId}`;

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <button
          type="button"
          className={styles.remove}
          onClick={() => removeFromCart(id)}
        >
          <img src="icons/close.svg" alt="Remove" />
        </button>

        <Link to={productLink} className={styles.imageLink}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </Link>

        <Link to={productLink} className={styles.name}>
          {product.name}
        </Link>
      </div>

      <div className={styles.controls}>
        <div className={styles.counter}>
          <button
            type="button"
            className={styles.counterButton}
            disabled={quantity === 1}
            onClick={() => changeQuantity(id, quantity - 1)}
          >
            <img src="icons/minus.svg" alt="Decrease" />
          </button>

          <span className={styles.quantity}>{quantity}</span>

          <button
            type="button"
            className={styles.counterButton}
            onClick={() => changeQuantity(id, quantity + 1)}
          >
            <img src="icons/plus.svg" alt="Increase" />
          </button>
        </div>

        <p className={styles.price}>${product.price * quantity}</p>
      </div>
    </div>
  );
};
