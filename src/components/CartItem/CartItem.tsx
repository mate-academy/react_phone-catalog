/* eslint-disable jsx-a11y/control-has-associated-label */
import './CartItem.scss';
import { useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import {
  CartItemType,
  decreaseQuantity,
  increaseQuantity,
  remove,
} from '../../features/cart/cartSlice';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { Button } from '../Button/Button';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const { id, imageUrl, name } = item.product;

  const cartItemPrice = useMemo(() => {
    return calculateDiscount(item.product);
  }, []);

  return (
    <div className="CartItem">
      <button
        className="CartItem__delete"
        type="button"
        data-cy="cartDeleteButton"
        onClick={() => dispatch(remove(id))}
      />

      <div className="CartItem__image">
        <img
          src={imageUrl}
          alt={name}
        />
      </div>

      <div className="CartItem__title">
        {name}
      </div>

      <div className="CartItem__quantity">
        <Button
          variant="quantity"
          sign="minus"
          disabled={item.quantity === 1}
          onClick={() => dispatch(decreaseQuantity(id))}
        />

        <span
          data-cy="productQauntity"
        >
          {item.quantity}
        </span>

        <Button
          variant="quantity"
          sign="plus"
          onClick={() => dispatch(increaseQuantity(id))}
        />
      </div>

      <div className="CartItem__price">
        <h2>
          {`$${cartItemPrice}`}
        </h2>
      </div>

    </div>
  );
};
