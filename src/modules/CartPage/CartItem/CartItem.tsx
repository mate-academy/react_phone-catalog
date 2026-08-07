import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CartItem.module.scss';
import IconRemove from '@public/img/icons/remove.svg?react';
import IconMinus from '@public/img/icons/icon-minus.svg?react';
import IconPlus from '@public/img/icons/icon-plus.svg?react';
import { useAppDispatch } from '@src/app/hooks';
import { actions as cartActions, CartProduct } from '@src/features/cart';

type Props = {
  item: CartProduct;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <article className={styles.item}>
      <div className={styles.itemProduct}>
        <button
          className={styles.itemRemove}
          onClick={() =>
            dispatch(cartActions.removeCartItem(item.product.itemId))
          }
        >
          <IconRemove className={styles.itemIconRemove} />
        </button>

        <Link to={`/product/${item.product.category}/${item.product.itemId}`}>
          <div className={styles.itemProductImg}>
            <img
              src={item.product.image}
              alt={item.product.name}
              className={styles.itemImage}
            />
          </div>
        </Link>

        <Link
          to={`/product/${item.product.category}/${item.product.itemId}`}
          className={styles.itemTitle}
        >
          {item.product.name}
        </Link>
      </div>

      <div className={styles.itemProductQuantity}>
        <div className={styles.itemProductAdded}>
          <button
            className={styles.itemQuantity}
            onClick={() =>
              dispatch(cartActions.decrementQuantity(item.product.itemId))
            }
            disabled={item.quantity === 1}
          >
            <IconMinus className={styles.itemIcon} />
          </button>

          <p>{item.quantity}</p>

          <button
            className={styles.itemQuantity}
            onClick={() =>
              dispatch(cartActions.incrementQuantity(item.product.itemId))
            }
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
