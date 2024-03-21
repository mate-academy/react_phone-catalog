import React, { memo, useMemo, useState } from 'react';
import classNames from 'classnames';

import { Cart, CartItem } from '../../utils/Cart';

import './CartCard.scss';

type Props = {
  item: CartItem;
};

const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;

export const CartCard: React.FC<Props> = memo(({ item }) => {
  const { image, name, price } = item.product;
  const { quantity, id } = item;

  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const isMinusDisabled = useMemo(
    () => currentQuantity === MIN_QUANTITY,
    [currentQuantity],
  );
  const isPlusDisabled = useMemo(
    () => currentQuantity === MAX_QUANTITY,
    [currentQuantity],
  );

  const handlePlus = () => {
    Cart.plusItem(id);
    setCurrentQuantity(prev => prev + 1);
  };

  const handleMinus = () => {
    Cart.minusItem(id);
    setCurrentQuantity(prev => prev - 1);
  };

  const handleRemove = () => {
    Cart.removeItem(id);
  };

  return (
    <div className="CartCard">
      <button
        type="button"
        className="CartCard__deleteBtn"
        onClick={handleRemove}
        aria-label="Delete from Cart"
        data-cy="cartDeleteButton"
      >
        <i className="fas fa-xmark CartCard__icon" />
      </button>

      <div className="CartCard__imageBlock">
        <img className="CartCard__image" src={`/_new/${image}`} alt={name} />
      </div>

      <p className="CartCard__name">
        {name}
        <br />
        (iMT9G2FS/A)
      </p>

      <div className="CartCard__quantityBlock">
        <button
          type="button"
          className={classNames('CartCard__quantityBtn', {
            'CartCard__quantityBtn--disabled': isMinusDisabled,
          })}
          aria-label="Minus Quantity"
          onClick={handleMinus}
        >
          <i className="fas fa-minus" />
        </button>

        <p className="CartCard__quantityCount">{currentQuantity}</p>

        <button
          type="button"
          className={classNames('CartCard__quantityBtn', {
            'CartCard__quantityBtn--disabled': isPlusDisabled,
          })}
          aria-label="Plus Quantity"
          onClick={handlePlus}
        >
          <i className="fas fa-plus" />
        </button>
      </div>

      <h2 className="CartCard__price">${price}</h2>
    </div>
  );
});
