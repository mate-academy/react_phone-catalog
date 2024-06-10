import React, { useState } from 'react';
import './Checkout.scss';
import { Warning } from '../Warning';

type Props = {
  totalPrice: number;
  totalQuantity: number;
};

export const Checkout: React.FC<Props> = ({ totalPrice, totalQuantity }) => {
  const [hasWarning, setHasWarning] = useState(false);

  const handleClick = () => {
    setHasWarning(true);
  };

  const warningMessage =
    'We are sorry, but this feature is not implemented yet';

  return (
    <article className="checkout">
      <div className="checkout__top">
        <h1 className="checkout__price">{`$${totalPrice}`}</h1>
        <span className="checkout__quantity">{`Total for ${totalQuantity} items`}</span>
      </div>

      <div className="checkout__line" />

      <button className="checkout__button" type="button" onClick={handleClick}>
        Checkout
      </button>

      {hasWarning && (
        <Warning text={warningMessage} setHasWarning={setHasWarning} />
      )}
    </article>
  );
};
