import { FC } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { ICartPhone } from '../../types';
import {
  decrementPhoneQauntity,
  incrementPhoneQauntity,
  removePhoneFromCart,
} from '../../features/cartSlices/cartSlice';
import { BASE_URL, formatter } from '../../helper';
import { DeleteIcon, MinusIcon, PlusIcon } from '../../icons';

import './CartItem.scss';

type Props = {
  phone: ICartPhone;
};

export const CartItem: FC<Props> = ({ phone }) => {
  const {
    name,
    image,
    phoneId,
    quantity,
    price,
  } = phone;

  const dispatch = useAppDispatch();

  const handleIncrementQuantity = () => {
    dispatch(incrementPhoneQauntity(phone));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementPhoneQauntity(phoneId));
  };

  const handleRemovePhoneFromCart = () => {
    dispatch(removePhoneFromCart(phoneId));
  };

  return (
    <>
      <div className="cartItem">
        <button
          className="cartItem__remove"
          data-cy="cartDeleteButton"
          onClick={handleRemovePhoneFromCart}
          type="button"
        >
          <DeleteIcon />
        </button>
        <div className="cartItem__imgWrapper">
          <img
            src={`${BASE_URL}/${image}`}
            alt="Phone"
            className="cartItem__image"
          />
        </div>
        <p className="cartItem__title">{`${name} (iMT9G2FS/A)`}</p>
        <button
          data-cy="productQauntity"
          className="cartItem__button cartItem__button--left"
          onClick={handleDecrementQuantity}
          type="button"
        >
          <MinusIcon />
        </button>
        <p className="cartItem__quantity">{quantity}</p>
        <button
          data-cy="productQauntity"
          className="cartItem__button cartItem__button--right"
          onClick={handleIncrementQuantity}
          type="button"
        >
          <PlusIcon />
        </button>
        <p className="cartItem__price">{formatter.format(price)}</p>
      </div>
    </>
  );
};
