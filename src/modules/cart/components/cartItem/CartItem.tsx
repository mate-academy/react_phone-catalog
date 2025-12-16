import React, { useContext } from 'react';
import { CartDispatchContext } from '../../../../shared/context/CartContext';
import { CartItemType } from '../../../../shared/types/CartItemType';
import styles from './CartItem.module.scss';

type Props = {
  cartItem: CartItemType;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const cartDispatch = useContext(CartDispatchContext);
  const isButtonPassive = cartItem.quantity === 1;
  const fullItemPrice = cartItem.quantity * cartItem.product.price;

  const handleDeleteButtonClick = (id: number) => {
    cartDispatch({
      type: 'delete_cartItem',
      payload: { id: id },
    });
  };

  const handleMinusButtonClick = (id: number) => {
    cartDispatch({
      type: 'decrease_quantity',
      payload: { id: id },
    });
  };

  const handlePlusButtonClick = (id: number) => {
    cartDispatch({
      type: 'increase_quantity',
      payload: { id: id },
    });
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.firstPart}>
        <button
          className={styles.deleteButton}
          onClick={() => handleDeleteButtonClick(cartItem.id)}
        >
          <span className={styles.icon} aria-hidden="true" />
        </button>
        <img
          className={styles.itemImg}
          src={cartItem.product.image}
          alt={cartItem.product.name}
        ></img>
        <p className="body-text">{cartItem.product.name}</p>
      </div>
      <div className={styles.secondPart}>
        <div className={styles.buttonsBlock}>
          <button
            className={styles.button}
            disabled={isButtonPassive}
            onClick={() => handleMinusButtonClick(cartItem.id)}
          >
            <span className={styles.iconMinus} aria-hidden="true" />
          </button>
          <p className="body-text">{cartItem.quantity}</p>
          <button
            className={styles.button}
            onClick={() => handlePlusButtonClick(cartItem.id)}
          >
            <span className={styles.iconPlus} aria-hidden="true" />
          </button>
        </div>
        <h3>{`$${fullItemPrice}`}</h3>
      </div>
    </div>
  );
};
