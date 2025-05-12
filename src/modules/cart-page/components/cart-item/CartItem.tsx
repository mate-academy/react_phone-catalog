import React from 'react';
import styles from './CartItem.module.scss';
import { cartSlice } from '../../../../store/slices/cart';
import { CartProduct, Product } from '../../../../types/types';
import { QuantityCounter } from '../quantity-counter/QuantityCounter';

interface CartItemProps {
  item: CartProduct;
  onRemove: (product: Product) => void;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const productBase = item as Product;

  return (
    <div className={styles['cart-item']}>
      <img
        src="./icons/Close.png"
        className={styles['cart-item__remove']}
        onClick={() => onRemove(productBase)}
      />
      <img
        src={item.image}
        alt={item.name}
        className={styles['cart-item__image']}
      />
      <h3 className={styles['cart-item__title']}>{item.name}</h3>
      <div className={styles['cart-item__quantity-wrapper']}>
        <QuantityCounter
          count={item.amount}
          onIncrease={() => onIncrease(productBase)}
          onDecrease={() => onDecrease(productBase)}
          disabledDecrease={
            item.amount <= 1 &&
            cartSlice.actions.decreaseAmount.type === 'cart/decreaseAmount'
          }
        />
      </div>
      <h3 className={styles['cart-item__price']}>${item.price}</h3>
    </div>
  );
};
