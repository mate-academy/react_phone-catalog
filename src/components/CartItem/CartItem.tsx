/* eslint-disable jsx-a11y/control-has-associated-label */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import {
  CartItemType,
  decreaseQuantity,
  increaseQuantity,
  remove,
} from '../../features/cart/cartSlice';
import { calculateDiscount } from '../../utils/calculateDiscount';
import { Button } from '../Button/Button';
import './CartItem.scss';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  const {
    id,
    imageUrl,
    name,
    type,
  } = item.product;
  const itemPath = `/${type}s/${id}`;

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

      <Link to={itemPath} className="CartItem__image">
        <img
          src={imageUrl}
          alt={name}
        />
      </Link>

      <Link to={itemPath} className="CartItem__title">
        {name}
      </Link>

      <div className="CartItem__quantity">
        <Button
          content="quantity"
          sign="minus"
          disabled={item.quantity === 1}
          onClick={() => dispatch(decreaseQuantity(id))}
        />

        <span
          data-cy="productQuantity"
        >
          {item.quantity}
        </span>

        <Button
          content="quantity"
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
