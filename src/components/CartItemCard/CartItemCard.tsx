import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './cart-item-card.scss';
import { CartItem } from '../../types/CartItem';
import { BASE_URL } from '../../utils/httpClient';
import { Button } from '../UI/Button';
import { StoreContext } from '../../contexts/StoreContext';

type Props = {
  cartItem: CartItem,
};

export const CartItemCard: React.FC<Props> = ({ cartItem }) => {
  const { good, quantity, itemTotalPrice } = cartItem;
  const {
    category,
    itemId,
    name,
    image,
  } = good;
  const { changeCart } = useContext(StoreContext);

  return (
    <div className="cart-item-card">
      <button
        type="button"
        className="cart-item-card__remove-button"
        onClick={() => changeCart(itemId, -quantity)}
      >
        <img
          src="./img/icons/Close.svg"
          alt="X"
          className="cart-item-card__remove-button-img"
        />
      </button>

      <Link
        to={`/${category}/${itemId}`}
        state="/cart"
        className="cart-item-card__link"
      >
        <img
          src={BASE_URL + image}
          alt={name}
          className="cart-item-card__image"
        />
        {name}
      </Link>

      <div className="cart-item-card__summary">
        <div className="cart-item-card__qty-conrlols">
          <Button
            handleClick={() => changeCart(itemId, -1)}
            disabled={quantity <= 1}
            imgName="Minus"
          />

          {quantity}

          <Button
            handleClick={() => changeCart(itemId, 1)}
            disabled={false}
            imgName="Plus"
          />
        </div>

        <p className="cart-item-card__item-total-price">
          {`$${itemTotalPrice}`}
        </p>
      </div>
    </div>
  );
};
