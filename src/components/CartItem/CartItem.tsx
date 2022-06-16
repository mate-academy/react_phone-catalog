import React, { useState, useEffect } from 'react';
import { CartList } from '../../types/CartList';
import { ReactComponent as Close } from '../../images/close.svg';

import './cartItem.scss';

type Props = {
  cartItem: CartList;
  updateCount: (id: any, itemCount: number) => void;
  deleteItem: (id: string) => void;
};

export const CartItem: React.FC<Props> = ({
  cartItem,
  updateCount,
  deleteItem,
}) => {
  const [itemCount, setItemCount] = useState(+cartItem.count);

  useEffect(() => {
    updateCount(cartItem.item.id, itemCount);
  }, [itemCount]);

  const addCount = () => {
    setItemCount(itemCount + 1);
  };

  const removeCount = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  return (
    <div className="cart-item">
      <Close
        className="cart-item__delete"
        onClick={() => deleteItem(cartItem.item.id)}
      />
      <div className="cart-item__img">
        <img src={cartItem.item.imageUrl} alt="" />
      </div>
      <h2 className="cart-item__title">
        {cartItem.item.name}
      </h2>
      <div className="cart-item__count">
        <button
          type="button"
          className="cart-item__remove"
          disabled={itemCount === 1}
          onClick={() => removeCount()}
        >
          -
        </button>
        <div className="cart-item__num">
          {itemCount}
        </div>
        <button
          type="button"
          className="cart-item__add"
          onClick={() => addCount()}
        >
          +
        </button>
      </div>
      <span className="cart-item__price">
        {`$${cartItem.item.price}`}
      </span>
    </div>
  );
};
