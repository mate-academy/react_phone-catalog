import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import styles from './CartItem.module.scss';
import { ContextProps } from '../../../../types/ContextProps';
import { CartItemType } from '../../../../types/CartItem';
import {
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from '../../../shared/components/Icons';

interface Props {
  product: CartItemType;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const { updateQuantity, removeFromCart } = useOutletContext<ContextProps>();
  const { itemId, name, image, quantity, price, fullPrice } = product;

  const actualPrice = price || fullPrice;
  const itemTotalPrice = actualPrice * quantity;

  return (
    <div className={styles.cartItem}>
      <button
        className={styles.removeBtn}
        onClick={() => removeFromCart(itemId)}
        aria-label="Remove from cart"
      >
        <CloseIcon />
      </button>

      <Link to={`/product/${itemId}`} className={styles.imageBox}>
        <img src={image} alt={name} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.nameLink}>
        <h3 className={styles.name}>{name}</h3>
      </Link>

      <div className={styles.footer}>
        <div className={styles.controls}>
          <button
            onClick={() => updateQuantity(itemId, -1)}
            disabled={quantity <= 1}
            className={styles.controlBtn}
            aria-label="Decrease quantity"
          >
            <MinusIcon />
          </button>

          <span className={styles.quantity}>{quantity}</span>

          <button
            onClick={() => updateQuantity(itemId, 1)}
            className={styles.controlBtn}
            aria-label="Increase quantity"
          >
            <PlusIcon />
          </button>
        </div>

        <span className={styles.price}>${itemTotalPrice}</span>
      </div>
    </div>
  );
};
