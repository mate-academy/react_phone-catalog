import { FC } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Phone } from '../../types/Phone';
import {
  addPhoneToCart,
  removePhoneFromCart,
} from '../../features/cartSlices/cartSlice';

type Props = {
  phone: Phone
};

export const CartItem: FC<Props> = ({ phone }) => {
  const {
    name,
    totalPrice,
    quantity,
    phoneId,
  } = phone;
  const dispatch = useAppDispatch();

  const handleIncrementQuantity = () => {
    dispatch(addPhoneToCart(phone));
  };

  const handleDecrementQuantity = () => {
    dispatch(removePhoneFromCart(phoneId));
  };

  return (
    <>
      <h1>{name}</h1>
      <div>
        <button onClick={handleIncrementQuantity} type="button">+</button>
        <p>{quantity}</p>
        <button onClick={handleDecrementQuantity} type="button">-</button>
      </div>

      <p>{totalPrice}</p>
    </>
  );
};
