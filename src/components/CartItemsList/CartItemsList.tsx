import React, { useState } from 'react';

import './CartItemsList.scss';
import { CartItem } from '../../helpers/types/CartItem';
import { CartItemCard } from '../CartItemCard';
import {
  getTotalPrice,
  getTotalQuantity,
} from '../../helpers/utils/getTotalAmount';

type Props = {
  cart: CartItem[],
};

export const CartItemList: React.FC<Props> = ({ cart }) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const handleCheckoutClick = () => {
    setIsCheckout(true);

    setTimeout(() => setIsCheckout(false), 3000);
  };

  return (
    <div className="CartItemsList">
      <div className="CartItemsList__items">
        {cart.map(cartItem => (
          <CartItemCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <div className="CartItemsList__output">
        <div className="CartItemsList__info">
          <p className="CartItemsList__price">{`$${getTotalPrice(cart)}`}</p>
          <p
            data-cy="productQauntity"
            className="CartItemsList__amount"
          >
            {`Total for ${getTotalQuantity(cart)} items`}
          </p>
        </div>
        <div className="CartItemsList__divider" />
        <button
          type="button"
          className="CartItemsList__checkout"
          onClick={handleCheckoutClick}
        >
          Checkout
        </button>
        {isCheckout && (
          <p className="CartItemsList__not-implemented">
            We are sorry, but this feature is not implemented yet
          </p>
        )}
      </div>
    </div>
  );
};
