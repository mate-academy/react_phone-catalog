/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

import './CartItemCard.scss';
import { CartItem } from '../../helpers/types/CartItem';
import { useAppDispatch } from '../../helpers/app/hooks';
import {
  decreaseAmount,
  increaseAmount,
  removeFromCart,
} from '../../helpers/features/cartSlice';

type Props = {
  cartItem: CartItem,
};

export const CartItemCard: React.FC<Props> = ({ cartItem }) => {
  const dispatch = useAppDispatch();
  const { quantity, product } = cartItem;

  const removeCartItem = () => {
    dispatch(removeFromCart(product.phoneId));
  };

  const decreaseQuantity = () => {
    dispatch(decreaseAmount(product.phoneId));
  };

  const increaseQuantity = () => {
    dispatch(increaseAmount(product.phoneId));
  };

  const getPrice = () => {
    return product.price * quantity;
  };

  return (
    <div className="CartItemCard">
      <div className="CartItemCard__left">
        <button
          data-cy="cartDeleteButton"
          type="button"
          className="CartItemCard__delete"
          onClick={removeCartItem}
        />

        <img
          src={product.image}
          alt={product.name}
          className="CartItemCard__image"
        />

        <p className="CartItemCard__description">{product.name}</p>
      </div>

      <div className="CartItemCard__right">
        <div className="CartItemCard__counter">
          <button
            type="button"
            className={classNames(
              'CartItemCard__button CartItemCard__button--subtract',
              { 'CartItemCard__button--subtract--disabled': quantity <= 1 },
            )}
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          />

          <p className="CartItemCard__quantity">{quantity}</p>

          <button
            type="button"
            className="CartItemCard__button CartItemCard__button--add"
            onClick={increaseQuantity}
          />
        </div>
        <p className="CartItemCard__price">{`$${getPrice()}`}</p>
      </div>
    </div>
  );
};
