import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './CartItem.module.scss';
import { useCart } from '../../ItemsProvider';
import { CartItemType } from '../../ItemsProvider';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { setCartItems } = useCart();
  const { product, quantity } = item;

  const handleUpdateQuantity = (delta: number) => {
    setCartItems(prev =>
      prev.map(cartItem => {
        if (cartItem.product.id === product.id) {
          return {
            ...cartItem,
            quantity: Math.max(1, cartItem.quantity + delta),
          };
        }

        return cartItem;
      }),
    );
  };

  const handleDelete = () => {
    setCartItems(prev => prev.filter(p => p.product.id !== product.id));
  };

  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItem__left}>
        <button
          className={styles.deleteItem}
          onClick={() => {
            handleDelete();
          }}
        >
          ×
        </button>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.link}
        >
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
          <p className={styles.name}>{product.name}</p>
        </Link>
      </div>

      <div className={styles.cartItem__right}>
        <div className={styles.counter}>
          <button
            className={classNames(styles.button, {
              [styles.disabled]: quantity === 1,
            })}
            onClick={() => handleUpdateQuantity(-1)}
            disabled={quantity === 1}
          >
            -
          </button>
          <p className={styles.countItem}>{quantity}</p>
          <button
            className={styles.button}
            onClick={() => handleUpdateQuantity(1)}
          >
            +
          </button>
        </div>

        <p className={styles.price}>${product.price * quantity}</p>
      </div>
    </article>
  );
};
