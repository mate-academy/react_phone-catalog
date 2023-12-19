import { useState } from 'react';
import { ErrorMessage } from './ErrorMessage';

export type CartSummaryProps = {
  itemsNum: number
  totalPrice: number
};

export const CartSummary = ({ itemsNum, totalPrice }: CartSummaryProps) => {
  const [error, setError] = useState<boolean>(false);

  const handleError = () => {
    setError(true);

    setTimeout(() => setError(false), 5000);
  };

  return (
    <div className="cartSummary">
      <h1 className="cartSummary__value h1">
        {`$${totalPrice}`}
      </h1>
      <p className="cartSummary__quantity BodyText" data-cy="productQauntity">
        {`Total for ${itemsNum} items`}
      </p>
      <span className="cartSummary__separator" />
      <button
        type="button"
        className="cartSummary__button buttons buttons__page BodyText"
        onClick={handleError}
      >
        Checkout
      </button>
      {error && <ErrorMessage />}
    </div>
  );
};
