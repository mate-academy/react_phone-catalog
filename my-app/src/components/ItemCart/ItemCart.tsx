import React, { useCallback, useContext } from 'react';
import styles from './ItemCart.module.scss';
import { CartContext } from '../../context/CartContext';
import { CartItem } from '../../types/types';

type Props = {
  item: CartItem;
};

export const ItemCart: React.FC<Props> = ({ item }) => {
  const { cartItems, updateCartItems } = useContext(CartContext);

  const handleDeleteItem = useCallback(() => {
    if (cartItems) {
      const updatedItems = cartItems.filter(
        cartItem => cartItem.product?.itemId !== item.product?.itemId,
      );
      updateCartItems(updatedItems);
    }
  }, [cartItems, item, updateCartItems]);

  const handleUpdateAmount = useCallback(
    (change: number) => {
      if (cartItems) {
        const updatedItems = cartItems.map(cartItem =>
          cartItem.product?.itemId === item.product?.itemId
            ? { ...cartItem, amount: cartItem.amount + change }
            : cartItem,
        );
        updateCartItems(updatedItems);
      }
    },
    [cartItems, item, updateCartItems],
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button className={styles.delete} onClick={handleDeleteItem}></button>
        <img className={styles.cartItemImage} src={item.product?.image} alt={item.product?.name} />
        <p className={styles.title}>{item.product?.name}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.actions}>
          <button
            disabled={item.amount === 1}
            className={styles.decrease}
            onClick={() => handleUpdateAmount(-1)}
          ></button>
          <p className={styles.amount}>{item.amount}</p>
          <button className={styles.increase} onClick={() => handleUpdateAmount(1)}></button>
        </div>
        <p className={styles.price}>${(item.product?.price || 0) * item.amount}</p>
      </div>
    </div>
  );
};
