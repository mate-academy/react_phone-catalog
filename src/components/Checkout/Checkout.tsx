/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React from 'react';

import './Checkout.scss';

const cat = require('../../images/banana-cat-crying.gif');

type Props = {
  setShowMessage: (status: boolean) => void;
};

export const Checkout: React.FC<Props> = ({ setShowMessage }) => {
  return (
    <div className="checkout">
      <span className="checkout__text">
        We are sorry, but this feature is not implemented yet
      </span>

      <img src={cat} alt="Cat" className="checkout__img" />

      <button
        type="button"
        className="checkout__close"
        onClick={() => setShowMessage(false)}
      >
        <img
          src={require('../../images/icons/delete-from-cart.svg').default}
          alt="Close"
        />
      </button>
    </div>
  );
};
