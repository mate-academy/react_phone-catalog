/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import '../styles/CartItem.scss';
import { CartItemType } from '../types/CartItemType';
import { API_URL } from '../utils/api-phones';
import { GlobalContext } from '../GlobalContext';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeCartList, increaseCartQuantity, decreaseCartQuantity } =
    useContext(GlobalContext);

  const { id, product, quantity } = item;
  const price = product.price * quantity;

  return (
    <li key={id} className="cart-item">
      <div className="cart-item__left-block">
        <button
          type="button"
          data-cy="cartDeleteButton"
          className="cart-item__delete-button"
          onClick={() => removeCartList(item)}
        />

        <Link to={product.itemId} className="cart-item__link">
          <div className="cart-item__photo-container">
            <img
              className="cart-item__photo"
              src={API_URL + product.image}
              alt="cart-item"
            />
          </div>

          <p className="cart-item__title">{product.name}</p>
        </Link>
      </div>

      <div className="cart-item__right-block">
        <div className="cart-item__quantity-buttons">
          <button
            type="button"
            className="cart-item__decrease-button"
            onClick={() => decreaseCartQuantity(id)}
            disabled={quantity === 1}
          />

          <span className="cart-item__quantity">{quantity}</span>

          <button
            type="button"
            className="cart-item__increase-button"
            onClick={() => increaseCartQuantity(id)}
          />
        </div>

        <span className="cart-item__price">{`$${price}`}</span>
      </div>
    </li>
  );
};
