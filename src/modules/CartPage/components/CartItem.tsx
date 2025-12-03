import React from 'react';
import { Link } from 'react-router-dom';
import classname from 'classnames';
import styles from './CartItem.module.scss';
import { CartItem as CartItemType } from '../../../types/CartItem';
import { useCart } from '../../shared/context/CartContext';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { product } = item;

  return (
    <div className={styles.cartItem}>
      <button
        className={styles.removeButton}
        onClick={() => removeFromCart(product.id)}
      >
        ×
      </button>

      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.nameLink}>
        {product.name}
      </Link>

      <div className={styles.quantityControls}>
        <button
          className={classname(styles.controlButton, {
            [styles.disabled]: item.quantity === 1,
          })}
          onClick={() => decreaseQuantity(product.id)}
          disabled={item.quantity === 1}
        >
          -
        </button>

        <span className={styles.quantity}>{item.quantity}</span>

        <button
          className={styles.controlButton}
          onClick={() => increaseQuantity(product.id)}
        >
          +
        </button>
      </div>

      <div className={styles.price}>${product.price}</div>
    </div>
  );
};
