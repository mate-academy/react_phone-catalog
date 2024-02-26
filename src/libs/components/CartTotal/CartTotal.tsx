import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Modal } from '../Modal';

import './CartTotal.scss';

export const CartTotal = () => {
  const { cartItems: items } = useAppSelector(state => state.cartItems);
  const [isModalActive, setIsModalActive] = useState(false);
  const totalSum = items.reduce(
    (sum, { product, quantity }) => (sum + quantity * product.price),
    0,
  );
  const totalItems = items.reduce(
    (sum, { quantity }) => (sum + quantity),
    0,
  );

  const handleClick = () => {
    setIsModalActive(true);
  };

  return (
    <>
      <div className="cart-total">
        <p className="cart-total__total-price">
          {`$ ${totalSum}`}
        </p>
        <p
          className="cart-total__description"
          data-cy="productQauntity"
        >
          {`Total for ${totalItems} items`}
        </p>
        <button
          type="button"
          className="cart-total__checkout-button"
          onClick={handleClick}
        >
          Checkout
        </button>
      </div>

      {isModalActive && (
        <Modal
          isActive={isModalActive}
          setIsModalActive={(value:boolean) => setIsModalActive(value)}
          text="We are sorry, but this feature is not implemented yet"
        />
      )}
    </>
  );
};
