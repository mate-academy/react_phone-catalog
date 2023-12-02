import { FC, useState } from 'react';

import './CartTotalPrice.scss';

type Props = {
  totalPrice: number,
  totalCartItems: number | null,
};

export const CartTotalPrice: FC<Props> = ({
  totalPrice,
  totalCartItems,
}) => {
  const [isMessage, setIsMessage] = useState(false);

  const handleViewMessage = () => {
    setIsMessage(true);
  };

  const handleCloseMessage = () => {
    setIsMessage(false);
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
          {`Total for ${totalCartItems} ${totalCartItems === 1 ? 'item' : 'items'}`}
        </p>
      </div>

      <button
        type="button"
        className="total-block__checkout-button"
        onClick={handleViewMessage}
      >
        Checkout
      </button>

      {isMessage && (
        <div className="message-container">
          <h1>We are sorry, but this feature is not implemented yet</h1>

          <button
            className="message-container__button"
            aria-label="message"
            type="button"
            onClick={handleCloseMessage}
          />
        </div>
      )}
    </div>
  );
};
