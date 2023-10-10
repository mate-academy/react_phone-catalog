import React from 'react';
import classNames from 'classnames';
import { Phone } from '../../Type/Phone';
import { useAppDispatch } from '../../app/hooks';
import {
  addAmountCart,
  removeAmountCart,
  removeCart,
} from '../../features/cartSlice';
import { BASE_URL } from '../../utils/BASE_URL';

import './cartContent.scss';

type Props = {
  cart: Phone;
};

export const CartContent: React.FC<Props> = ({ cart }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="carts"
      key={cart.itemId}
    >
      <div className="cart carts__content">
        <div className="carts__content--wrapper">
          <button
            type="button"
            aria-label="Mute volume"
            className="cart__button cart__button--close"
            onClick={() => dispatch(removeCart(cart))}
          />

          <img
            src={`${BASE_URL}/_new/${cart.image}`}
            alt="cart"
            className="cart__img"
          />
        </div>

        <p className="cart__name">{cart.name}</p>

        <div className="cart__price--wrapper">
          <div className="cart__buttons">
            <button
              type="button"
              aria-label="Mute volume"
              className={classNames(
                'cart__button--minus cart__button cart--button',
                { 'cart__button--minusActive': cart.amount !== 1 },
              )}
              onClick={() => dispatch(removeAmountCart(cart))}
              disabled={cart.amount === 1}
            />
            {cart.amount}
            <button
              type="button"
              aria-label="Mute volume"
              className="cart__button--plus cart__button cart--button"
              onClick={() => dispatch(addAmountCart(cart))}
            />
          </div>

          <>
            <h2 className="cart__price">{`$${cart.fullPrice}`}</h2>
          </>
        </div>
      </div>
    </div>
  );
};
