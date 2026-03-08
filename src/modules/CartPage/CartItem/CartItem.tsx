import React from 'react';
import { MinusIcon } from '../../../components/ui/MinusIcon';
import { PlusIcon } from '../../../components/ui/PlusIcon';
import { CloseIcon } from '../../../components/ui/CloseIcon';
import { CartItemInterface, useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';
import { PathType } from '../../../types/Types';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemInterface;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () =>
    updateQuantity(item.product.id, item.quantity + 1);

  const handleDecrease = () =>
    updateQuantity(item.product.id, item.quantity - 1);

  const handleRemove = () => removeFromCart(item.product.id);

  const handleTotalPrice = () => item.product.price * item.quantity;

  return (
    <div className={styles.cart__item}>
      <div className={styles.cart__info}>
        <button
          type="button"
          className={styles.cart__buttonDelete}
          onClick={handleRemove}
        >
          <CloseIcon />
        </button>
        <Link to={`${PathType.PRODUCT}/${item.product.itemId}`}>
          <img
            src={item.product.image}
            alt={item.product.name}
            className={styles.cart__itemImage}
          />
        </Link>
        <Link
          to={`${PathType.PRODUCT}/${item.product.itemId}`}
          className={styles.cart__itemTitle}
        >
          {item.product.name}
        </Link>
      </div>
      <div className={styles.cart__actions}>
        <div className={styles.cart__quantityControl}>
          <button
            type="button"
            className={styles.cart__buttonMinus}
            onClick={handleDecrease}
            disabled={item.quantity === 1}
          >
            <MinusIcon />
          </button>
          <span className={styles.cart__quantity}>{item.quantity}</span>
          <button
            type="button"
            className={styles.cart__buttonPlus}
            onClick={handleIncrease}
          >
            <PlusIcon />
          </button>
        </div>
        <span className={styles.cart__price}>${handleTotalPrice()}</span>
      </div>
    </div>
  );
};
