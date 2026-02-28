import React from 'react';

import styles from './CartItem.module.scss';
import { MinusIcon } from '../../../components/ui/MinusIcon';
import { PlusIcon } from '../../../components/ui/PlusIcon';
import { CloseIcon } from '../../../components/ui/CloseIcon';
import { CatalogProducts } from '../../../types/ProductTypes';
import { useCart } from '../../../context/CartContext';

interface CartItemProps {
  item: CatalogProducts & { quantity: number };
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => updateQuantity(item.id, item.quantity + 1);
  const handleDecrease = () => updateQuantity(item.id, item.quantity - 1);
  const handleRemove = () => removeFromCart(item.id);

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
        <img
          src={item.image}
          alt={item.name}
          className={styles.cart__itemImage}
        />
        <span className={styles.cart__itemTitle}>{item.name}</span>
      </div>
      <div className={styles.cart__actions}>
        <div className={styles.cart__quantityControl}>
          <button
            type="button"
            className={styles.cart__buttonMinus}
            onClick={handleDecrease}
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
        <span className={styles.cart__price}>${item.price}</span>
      </div>
    </div>
  );
};
