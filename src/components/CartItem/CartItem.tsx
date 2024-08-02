import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import { StorageItem } from '../../types/StorageItem';
import { AppContext } from '../../Root';
import styles from './CartItem.module.scss';

interface Props {
  cartItem: StorageItem;
}

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { id: cartItemId, quantity, product: cartProduct } = cartItem;

  const {
    itemId: productId,
    name,
    image,
    appliedPrice,
    fullPrice,
  } = cartProduct;

  const { cartItems, setCartItems } = useContext(AppContext);

  const handleRemoveCartItem = useCallback(() => {
    setCartItems(cartItems.filter(({ id }) => id !== cartItemId));
  }, [cartItemId, cartItems, setCartItems]);

  const handleBtnClick = useCallback(
    (newItem: StorageItem): void => {
      const newCartItems = [...cartItems];

      const index = newCartItems.findIndex(({ id }) => id === cartItemId);

      if (index !== -1) {
        newCartItems.splice(index, 1, newItem);
      }

      setCartItems(newCartItems);
    },
    [cartItemId, cartItems, setCartItems],
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
              handleBtnClick({ ...cartItem, quantity: quantity - 1 })
            }
          />
          <p className={styles.quantity}>{quantity}</p>
          <button
            type="button"
            disabled={quantity >= 10}
            className={classNames(styles.btn, styles.btnPlus)}
            onClick={() =>
              handleBtnClick({ ...cartItem, quantity: quantity + 1 })
            }
          />
        </div>

        <p className={styles.price}>{`$${appliedPrice || fullPrice}`}</p>
      </div>
    </div>
  );
};
