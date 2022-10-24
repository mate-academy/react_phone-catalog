/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartProvider';

type Props = {
  cartItem: InitialProduct;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { removeFromCart, increase, decrease } = useContext(CartContext);
  const {
    type, id, imageUrl, name, price, discount, quantityInCart,
  } = cartItem;

  return (
    <div className="cartItem">
      <div className="cartItem__product-info">
        <button
          type="button"
          className="cartItem__button-remove"
          data-cy="cartDeleteButton"
          onClick={() => removeFromCart(id)}
        />
        <div className="cartItem__foto">
          <Link
            to={`/${type}s/${id}`}
          >
            <img src={imageUrl} alt={`${name}`} className="cartItem__image" />
          </Link>
        </div>
        <Link
          to={`/${type}s/${id}`}
          className="cartItem__title"
        >
          {name}
        </Link>
      </div>
      <div className="cartItem__product-cost">
        <div className="cartItem__counter">
          <button
            type="button"
            disabled={quantityInCart === 1}
            className={classNames(
              'cartItem__counter-button cartItem__counter-button--decrease',
              {
                'cartItem__counter-button--decrease-active': quantityInCart > 1,
              },
            )}
            onClick={() => decrease(id)}
          />
          <div className="cartItem__counter-quantity">
            {quantityInCart}
          </div>
          <button
            type="button"
            className="cartItem__counter-button
            cartItem__counter-button--increase"
            onClick={() => increase(id)}
          />
        </div>
        <div className="cartItem__cost">
          {discount > 0
            ? `$${Math.round(price - (price * (discount / 100))) * quantityInCart}`
            : `$${price * quantityInCart}`}
        </div>
      </div>
    </div>

  );
};
