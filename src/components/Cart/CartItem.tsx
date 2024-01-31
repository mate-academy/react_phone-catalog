import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { IPhone } from '../../types';
import {
  decrementPhoneQauntity,
  incrementPhoneQauntity,
  removePhoneFromCart,
} from '../../features/cartSlices/cartSlice';
import { BASE_URL } from '../../helper';
import './CartItem.scss';
import { DeleteIcon } from '../../icons/DeleteIcon';
import { MinusIcon } from '../../icons/MinusIcon';
import { PlusIcon } from '../../icons/PlusIcon';
import { formatter } from '../../helper/formater';

type Props = {
  phone: IPhone;
};

export const CartItem: FC<Props> = ({ phone }) => {
  const {
    name,
    image,
    quantity,
    phoneId,
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
          className="cartItem__button cartItem__button--left"
          onClick={handleDecrementQuantity}
          type="button"
        >
          <MinusIcon />
        </button>
        <p className="cartItem__quantity">{quantity}</p>
        <button
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
