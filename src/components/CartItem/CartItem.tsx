import React, { FC, memo } from 'react';

import './CartItem.scss';

type Props = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  imageUrl: string,
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onItemRemove: (id: string) => void;
};

export const CartItem: FC<Props> = memo(({
  id,
  quantity,
  name,
  price,
  imageUrl,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onItemRemove,
}) => {
  const handleIncrease = () => {
    onIncreaseQuantity(id);
  };

  const handleDicrease = () => {
    onDecreaseQuantity(id);
  };

  return (
    <div className="cart__item cart-item">
      <button
        type="button"
        onClick={() => onItemRemove(id)}
        data-cy="cartDeleteButton"
        className="cart-item__delete-button"
        aria-label="cartDeleteButton"
      />

      <div className="cart-item__image-container">
        <img
          src={`./img/${imageUrl}`}
          alt={`${id}`}
          className="cart-item__image"
        />
      </div>

      <div className="cart-item__name-count">
        <p className="cart-item__item-title">
          {name}
        </p>

        <div className="cart-item__count-container">
          <button
            type="button"
            onClick={handleDicrease}
            disabled={quantity <= 1}
            aria-label="decreaseButton"
            className="
              cart-item__count-button
              cart-item__count-button--decrease
            "
          />
          <p className="cart-item__count-quantity">
            {quantity}
          </p>
          <button
            type="button"
            onClick={handleIncrease}
            aria-label="increaseButton"
            className="
              cart-item__count-button
              cart-item__count-button--increase
            "
          />
        </div>
      </div>

      <p className="cart-item__item-price">
        {`$${price}`}
      </p>
    </div>
  );
});
