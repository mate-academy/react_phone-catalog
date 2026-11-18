import React from 'react';
import { IoClose, IoAdd, IoRemove } from 'react-icons/io5';

import { useCart } from '../../../hooks/useCartContext';

import { CartItem } from '../../../types/CartItem';

import styles from './Cart.module.scss';

type Props = {
  product: CartItem;
};

export const Cart: React.FC<Props> = ({ product: { product, quantity } }) => {
  const { dispatch } = useCart();

  return (
    <article className={styles.cart}>
      <div className={styles.cart__info}>
        <button
          className={styles.cart__remove}
          onClick={() => dispatch({ type: 'remove', payload: product.id })}
        >
          <IoClose className={styles['cart__icon-remove']} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className={styles.cart__image}
        />
        <h2 className={styles.cart__title}>{product.name}</h2>
      </div>

      <div className={styles.cart__row}>
        <div className={styles.cart__quantity}>
          <button
            className={styles.cart__button}
            disabled={quantity <= 1}
            onClick={() =>
              dispatch({
                type: 'changeQuantity',
                payload: { id: product.id, delta: -1 },
              })
            }
          >
            <IoRemove className={styles['cart__quantity-icon']} />
          </button>
          <span className={styles.cart__count}>{quantity}</span>
          <button
            className={styles.cart__button}
            onClick={() =>
              dispatch({
                type: 'changeQuantity',
                payload: { id: product.id, delta: 1 },
              })
            }
          >
            <IoAdd className={styles['cart__quantity-icon']} />
          </button>
        </div>
        <p className={styles.cart__price}>${product.price * quantity}</p>
      </div>
    </article>
  );
};
