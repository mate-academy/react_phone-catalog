import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { CartItemType } from '../../types/CartItemType';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/fetchCLient';
import './CartItem.scss';

type Props = {
  item: CartItemType;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity }
    = useContext(CartContext);

  const {
    image, name, price, itemId, category,
  } = item.product as Product;

  return (
    <li className="CartItem">
      <div className="CartItem__main-info">
        <button
          type="button"
          aria-label="Delete"
          className="CartItem__clear"
          data-cy="cartDeleteButton"
          onClick={() => removeFromCart(itemId)}
        />
        <Link to={`/${category}/${itemId}`} className="CartItem__link">
          <div className="CartItem__image-container">
            <img
              src={`${BASE_URL}/${image}`}
              alt={name}
              className="CartItem__image"
            />
          </div>
          <span className="CartItem__title">{name}</span>
        </Link>
      </div>

      <div className="CartItem__quan-and-price">
        <div className="CartItem__quantity-area">
          <button
            type="button"
            aria-label="Remove"
            className="button button--minus"
            disabled={item.quantity === 1}
            onClick={() => decreaseQuantity(itemId)}
          />
          <p className="CartItem__quantity">{item.quantity || 1}</p>
          <button
            type="button"
            aria-label="Add"
            className="button button--plus"
            onClick={() => increaseQuantity(itemId)}
          />
        </div>
        <span className="CartItem__price">
          &#36;
          {price}
        </span>
      </div>
    </li>
  );
};
