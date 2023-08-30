/* eslint-disable jsx-a11y/control-has-associated-label */
import './CartItem.scss';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="CartItem__body">
        <button
          className="CartItem__delete"
          type="button"
          data-cy="cartDeleteButton"
          aria-label="delete"
          onClick={() => dispatch(remove(id))}
        />

        <Link to={itemPath} className="CartItem__image">
          <img
            src={imageUrl}
            alt={name}
            width="66"
            height="66"
          />
        </Link>

        <Link to={itemPath} className="CartItem__title">
          {name}
        </Link>
      </div>

      <div className="CartItem__total">
        <div className="CartItem__quantity">
          <Button
            variant="quantity"
            sign="minus"
            aria-label="quantity-decrease"
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
            aria-label="quantity-increase"
            onClick={() => dispatch(increaseQuantity(id))}
          />
        </div>

        <div className="CartItem__price">
          <h2>
            {`$${cartItemPrice}`}
          </h2>
        </div>
      </div>
    </div>
  );
};
