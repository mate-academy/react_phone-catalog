/* eslint-disable import/extensions */
import React from 'react';
import '@/styles/main.scss';
import styles from './CartItem.module.scss';
import classNames from 'classnames';
import { ProductBrief } from '@/types/ProductBrief';
import { Link } from 'react-router-dom';

interface Props {
  product: ProductBrief;
  quantity: number;
  onQtyChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItem: React.FC<Props> = ({
  product,
  quantity,
  onQtyChange,
  onRemove,
}) => {
  const decreaseQty = () => {
    const newQty = quantity - 1;

    onQtyChange(product.id, newQty);
  };

  const increaseQty = () => {
    const newQty = quantity + 1;

    onQtyChange(product.id, newQty);
  };

  const remove = () => {
    onRemove(product.id);
  };

  const itemPrice = product.price * quantity;

  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item__desc}>
        <div className={styles.cart_item__remove}>
          <i className="icon icon--close" onClick={remove}></i>
        </div>
        <div className={styles.cart_item__image}>
          <img
            src={product.image}
            alt={product.name}
            className={styles['cart_item__image--img']}
          />
        </div>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={classNames(styles.cart_item__title, 'text__body')}
        >
          {product.name}
        </Link>
      </div>
      <div className={styles.cart_item__controls}>
        <div className={styles.cart_item__qty}>
          <button
            className="button__circle button__circle--regular"
            onClick={decreaseQty}
          >
            -
          </button>
          <p
            className={classNames(styles['cart_item__qty--text'], 'text__body')}
          >
            {quantity}
          </p>
          <button
            className="button__circle button__circle--regular"
            onClick={increaseQty}
          >
            +
          </button>
        </div>
        <h3>${itemPrice}</h3>
      </div>
    </div>
  );
};
