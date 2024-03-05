/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/CartItem.scss';
import { CartItemType } from '../types/CartItemType';
import { API_URL } from '../utils/api-phones';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  // const { cartList } = useContext(GlobalContext);
  const { id, product, quantity } = item;
  const price = product.price * quantity;

  return (
    <li key={id} className="cart-item">
      <div className="cart-item__left-block">
        <button
          type="button"
          data-cy="cartDeleteButton"
          className="cart-item__delete-button"
        />

        <Link
          to={product.itemId}
          className="cart-item__link"
        >
          <div className="cart-item__photo-container">
            <img
              className="cart-item__photo"
              src={API_URL + product.image}
              alt="cart-item"
            />
          </div>

          <p className="cart-item__title">
            {product.name}
          </p>
        </Link>

      </div>

      <div className="cart-item__right-block">
        <div className="cart-item__quantity-buttons">
          <button
            type="button"
            className="cart-item__decrease-button"
          />

          <span className="cart-item__quantity">
            {quantity}
          </span>

          <button
            type="button"
            className="cart-item__increase-button"
          />
        </div>

        <span className="cart-item__price">
          {`$${price}`}
        </span>
      </div>
    </li>
  );
};
