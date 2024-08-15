import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectCartItems,
  setCartItems,
} from '../../redux/slices/cartItemsSlice';
import { StorageItem } from '../../types/StorageItem';
import styles from './CartItem.module.scss';

interface Props {
  cartItem: StorageItem;
}

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { id: cartItemId, quantity, product: cartProduct } = cartItem;

  const { itemId: productId, name, image, price } = cartProduct;

  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const handleRemoveCartItem = useCallback(() => {
    const newItems = cartItems.filter(({ id }) => id !== cartItemId);

    dispatch(setCartItems(newItems));
  }, [cartItemId, cartItems, dispatch]);

  const handleBtnQtyClick = useCallback(
    (newItem: StorageItem): void => {
      const newItems = [...cartItems];

      const index = newItems.findIndex(({ id }) => id === cartItemId);

      if (index !== -1) {
        newItems.splice(index, 1, newItem);
      }

      dispatch(setCartItems(newItems));
    },
    [cartItemId, cartItems, dispatch],
  );

  return (
    <div className={styles.cartItem}>
      <div className={styles.contentLeft}>
        <button
          type="button"
          className={styles.btnRemove}
          onClick={handleRemoveCartItem}
        />

        <img className={styles.img} src={image} alt={productId} />

        <p className={styles.name}>{name}</p>
      </div>

      <div className={styles.contentRight}>
        <div className={styles.buttonsWrapper}>
          <button
            type="button"
            disabled={quantity <= 1}
            className={classNames(styles.btn, styles.btnMinus)}
            onClick={() =>
              handleBtnQtyClick({ ...cartItem, quantity: quantity - 1 })
            }
          />
          <p className={styles.quantity}>{quantity}</p>
          <button
            type="button"
            disabled={quantity >= 10}
            className={classNames(styles.btn, styles.btnPlus)}
            onClick={() =>
              handleBtnQtyClick({ ...cartItem, quantity: quantity + 1 })
            }
          />
        </div>

        <p className={styles.price}>{`$${price}`}</p>
      </div>
    </div>
  );
};
