import React from 'react';
import * as cartAction from '../../feature/cartSlice';
import { Phone } from '../../type/Phone';
import { BASE_URL } from '../../utils/BASE_URL';
import { useAppDispatch } from '../../app/hooks';

type Props = {
  phone: Phone
};

export const CartItem: React.FC<Props> = ({ phone }) => {
  const dispatch = useAppDispatch();

  const removeAmountCart = (item: Phone) => {
    dispatch(cartAction.removeAmountCart(item));
  };

  const addAmountCart = (item: Phone) => {
    dispatch(cartAction.addAmountCart(item));
  };

  const removeCart = (item: Phone) => {
    dispatch(cartAction.removeCart(item));
  };

  return (
    <div className="cartItem">
      <button
        type="button"
        className="cartItem__close"
        onClick={() => removeCart(phone)}
        data-cy="cartDeleteButton"
      >
        <img
          src="./images/icons/Close.svg"
          alt="close"
        />
      </button>

      <div className="cartItem__photo">
        <img
          src={`${BASE_URL}/_new/${phone.image}`}
          alt="item img"
          className="cartItem__img"
        />
      </div>

      <div className="cartItem__itemName">{phone.name}</div>

      <div className="cartItem__action">
        <button
          type="button"
          className="cartItem__button"
          onClick={() => removeAmountCart(phone)}
          disabled={phone.amount === 1}
        >
          -
        </button>

        <span className="cartItem__itemAmount">{phone.amount }</span>

        <button
          type="button"
          className="cartItem__button"
          onClick={() => addAmountCart(phone)}
        >
          +
        </button>
      </div>

      <span className="cartItem__totalPrice">
        {phone.amount && (
          phone.fullPrice < 1200 && phone.amount
            ? `$${phone.price * phone.amount}`
            : `$${phone.fullPrice * phone.amount}`
        )}
      </span>
    </div>
  );
};
