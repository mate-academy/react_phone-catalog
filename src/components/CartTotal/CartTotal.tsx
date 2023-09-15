import React, { FC, useState } from 'react';
import './CartTotal.scss';

type Props = {
  totalPrice: number;
  totalItems: number | null;
};

export const CartTotal: FC<Props> = ({
  totalPrice,
  totalItems,
}) => {
  const [isMessageShow, setIsMessageShow] = useState(false);

  const handleOnCheckout = () => {
    setIsMessageShow(true);
  };

  const handleCloseMessage = () => {
    setIsMessageShow(false);
  };

  return (
    <div className="cart__total total-block">
      <div className="total-block__info">
        <p className="total-block__total-price">
          {`$${totalPrice}`}
        </p>
        <p
          className="total-block__total-items"
          data-cy="productQauntity"
        >
          {`Total for ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
        </p>
      </div>

      <button
        type="button"
        className="total-block__checkout-button"
        onClick={handleOnCheckout}
      >
        Checkout
      </button>

      {
        isMessageShow && (
          <div className="not-implemented-message">
            We are sorry, but this feature is not implemented yet

            <button
              type="button"
              aria-label="notImplementedButton"
              className="not-implemented-message__button"
              onClick={handleCloseMessage}
            />
          </div>
        )
      }
    </div>
  );
};
