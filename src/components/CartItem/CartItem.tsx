import { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '../../types/Icons';
import { BASE_URL } from '../../utils/fetchClient';
import { Icon } from '../Icon';
import './CartItem.scss';
import { CartItemProps } from './types';

export const CartItem = memo<CartItemProps>(({
  cartItem,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const onClickRemove = useCallback(() => {
    onRemove(cartItem.product.id);
  }, [cartItem, onRemove]);

  const onClickDecrement = useCallback(() => {
    onDecrement(cartItem.product.id);
  }, [cartItem, onDecrement]);

  const onClickIncrement = useCallback(() => {
    onIncrement(cartItem.id);
  }, [cartItem.id, onIncrement]);

  return (
    <div className="cart-item">
      <div className="cart-item__main-info">
        <button
          aria-label="removeItem"
          type="button"
          className="cart-item__remove-button"
          onClick={onClickRemove}
        >
          <Icon icon={Icons.Close} />
        </button>
        <NavLink
          to={`/${cartItem.product.category}/${cartItem.product.phoneId}`}
          className="cart-item__link"
        >
          <img
            className="cart-item__image"
            src={`${BASE_URL}${cartItem.product.image}`}
            alt="productImage"
          />
          <p className="cart-item__title">{cartItem.product.name}</p>
        </NavLink>
      </div>

      <div className="cart-item__controls">
        <button
          type="button"
          className="cart-item__val-button"
          onClick={onClickDecrement}
          disabled={cartItem.quantity <= 1}
        >
          -
        </button>
        <span className="cart-item__quantity">{cartItem.quantity}</span>
        <button
          type="button"
          className="cart-item__val-button"
          onClick={onClickIncrement}
          disabled={cartItem.quantity >= 99}
        >
          +
        </button>
      </div>
      <h2 className="cart-item__price">
        {`$${cartItem.product.price * cartItem.quantity}`}
      </h2>
    </div>
  );
});
