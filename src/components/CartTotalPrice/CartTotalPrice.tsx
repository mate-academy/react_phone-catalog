import { FC } from 'react';

import './CartTotalPrice.scss';

type Props = {
  totalPrice: number,
  totalCartItems: number | null,
};

export const CartTotalPrice: FC<Props> = ({
  totalPrice,
  totalCartItems,
}) => {
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
      >
        Checkout
      </button>
    </div>
  );
};
