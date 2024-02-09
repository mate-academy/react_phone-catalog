import React, { useContext } from 'react';
import './Checkout.scss';
import { GlobalContext } from '../../GlobalContext';

type Props = {
  onSubmit: (b: boolean) => void,
};

export const Checkout: React.FC<Props> = ({ onSubmit }) => {
  const { cartItems } = useContext(GlobalContext);
  const totalPrice = cartItems
    .reduce((prev, current) => (
      prev + current.quantity * current.product.price
    ), 0);

  const totalItems = cartItems
    .reduce((prev, current) => (prev + current.quantity), 0);

  const handleCheckOut = () => {
    onSubmit(true);
    setTimeout(() => {
      onSubmit(false);
    }, 2000);
  };

  return (
    <div className="Checkout">
      <div className="Checkout__top">
        <h1 className="Checkout__total">
          {totalPrice}
        </h1>

        <p className="Checkout__text" data-cy="productQauntity">
          {totalItems === 1 ? (
            <span>
              {`Total for ${totalItems} item`}
            </span>
          ) : (
            <span>
              {`Total for ${totalItems} items`}
            </span>
          )}
        </p>
      </div>

      <div className="Checkout__deviding-line" />

      <button
        type="button"
        className="Checkout__button"
        onClick={handleCheckOut}
      >
        Checkout
      </button>
    </div>
  );
};
