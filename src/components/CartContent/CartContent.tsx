import React from 'react';
import classNames from 'classnames';
import { Phone } from '../../types/Phone';
import { useAppDispatch } from '../../helpers/hook';
import {
  addAmountCart,
  removeAmountCart,
  removeCart,
} from '../../helpers/cartSlice';
import { BASE_URL } from '../../utils/BASE_URL';

import './CartContent.scss';

type Props = {
  cart: Phone;
};

export const CartContent: React.FC<Props> = ({ cart }) => {
  const {
    itemId,
    image,
    name,
    amount,
    fullPrice,
  } = cart;
  const dispatch = useAppDispatch();
  const onRemove = () => dispatch(removeCart(cart));
  const onAdd = () => dispatch(addAmountCart(cart));
  const onRemoveOne = () => dispatch(removeAmountCart(cart));

  return (
    <div
      className="carts"
      key={itemId}
    >
      <div className="cart carts__content">
        <div className="carts__content--wrapper">
          <button
            type="button"
            aria-label="Mute volume"
            className="cart__button cart__button--close"
            onClick={onRemove}
          />

          <img
            src={`${BASE_URL}/_new/${image}`}
            alt="cart"
            className="cart__img"
          />
        </div>

        <p className="cart__name">{name}</p>

        <div className="cart__price--wrapper">
          <div className="cart__buttons">
            <button
              type="button"
              aria-label="Mute volume"
              className={classNames(
                'cart__button cart--button',
                'cart__button--minus',
              )}
              onClick={onRemoveOne}
              disabled={amount === 1}
            />
            {amount}
            <button
              type="button"
              aria-label="Mute volume"
              className="cart__button--plus cart__button cart--button"
              onClick={onAdd}
            />
          </div>

          <>
            <h2 className="cart__price">{`$${fullPrice}`}</h2>
          </>
        </div>
      </div>
    </div>
  );
};
