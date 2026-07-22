import { CartItemType, useCart } from '@shared/context/CartContext';
import React from 'react';
import styles from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import IconRemove from '@public/img/icons/remove.svg?react';
import IconMinus from '@public/img/icons/icon-minus.svg?react';
import IconPlus from '@public/img/icons/icon-plus.svg?react';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <article className={styles.item}>
      <div className={styles.itemProduct}>
        <button
          className={styles.itemRemove}
          onClick={() => removeFromCart(item.product.itemId)}
        >
          <IconRemove className={styles.itemIconRemove} />
        </button>

        <Link to={`/product/${item.product.itemId}`}>
          <div className={styles.itemProductImg}>
            <img
              src={item.product.image}
              alt={item.product.name}
              className={styles.itemImage}
            />
          </div>
        </Link>

        <Link
          to={`/product/${item.product.itemId}`}
          className={styles.itemTitle}
        >
          {item.product.name}
        </Link>
      </div>

      <div className={styles.itemProductQuantity}>
        <div className={styles.itemProductAdded}>
          <button
            className={styles.itemQuantity}
            onClick={() => decreaseQuantity(item.product.itemId)}
            disabled={item.quantity === 1}
          >
            <IconMinus className={styles.itemIcon} />
          </button>

          <p>{item.quantity}</p>

          <button
            className={styles.itemQuantity}
            onClick={() => increaseQuantity(item.product.itemId)}
          >
            <IconPlus className={styles.itemIcon} />
          </button>
        </div>

        <div
          className={styles.itemPrice}
        >{`$${item.product.price * item.quantity}`}</div>
      </div>
    </article>
  );
};
