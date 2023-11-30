import { FC, useState } from 'react';

import './CartItem.scss';

type Props = {
  id: string;
  count: number;
  name: string;
  price: number;
  image: string;
  onCountChange: (count: number, id: string) => void;
  onItemRemove: (id: string) => void;
};

export const CartItem: FC<Props> = ({
  id,
  count,
  name,
  price,
  image,
  onCountChange,
  onItemRemove,
}) => {
  const [currentCount, setCurrentCount] = useState(count);

  const handleIncrease = () => {
    setCurrentCount(prev => prev + 1);
    onCountChange(count + 1, id);
  };

  const handleDecrease = () => {
    setCurrentCount(prev => prev - 1);
    onCountChange(count - 1, id);
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
        <img src={`${image}`} alt={`${id}`} className="cart-item__image" />
      </div>

      <div className="cart-item__name-count">
        <p className="cart-item__item-title">
          {name}
        </p>

        <div className="cart-item__count-container">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={count <= 1}
            aria-label="decreaseButton"
            className="cart-item__count-button
            cart-item__count-button--decrease"
          />

          <p className="cart-item__count-title">
            {currentCount}
          </p>

          <button
            type="button"
            onClick={handleIncrease}
            disabled={count >= 10}
            aria-label="increaseButton"
            className="cart-item__count-button
            cart-item__count-button--increase"
          />
        </div>
      </div>

      <p className="cart-item__item-price">
        {`$${price}`}
      </p>
    </div>
  );
};
