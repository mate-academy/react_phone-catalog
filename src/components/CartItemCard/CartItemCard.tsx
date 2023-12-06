/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

import './CartItemCard.scss';
import { CartItem } from '../../helpers/types/CartItem';
import { getDiscountedPrice } from '../../helpers/utils/getDiscount';
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
    dispatch(removeFromCart(product.id));
  };

  const decreaseQuantity = () => {
    dispatch(decreaseAmount(product.id));
  };

  const increaseQuantity = () => {
    dispatch(increaseAmount(product.id));
  };

  const getPrice = () => {
    const realPrice = product.discount
      ? getDiscountedPrice(product)
      : product.price;

    return realPrice * quantity;
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
          src={product.imageUrl}
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
