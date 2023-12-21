import { useState } from 'react';

interface Props {
  totalPrice: number;
  totalNumber: number;
}

export const CartInfo: React.FC<Props> = ({ totalPrice, totalNumber }) => {
  const [isBtnActive, setIsBtnActive] = useState(false);

  return (
    <div className="cart__info">
      <div className="h1 cart__total">{`$${totalPrice}`}</div>
      <div className="text cart__label">{`Total for ${totalNumber === 1 ? `${totalNumber} item` : `${totalNumber} items`}`}</div>
      <div className="cart__bottom">
        <button
          type="button"
          className="btn"
          onClick={() => setIsBtnActive(true)}
        >
          {isBtnActive
            ? 'We are sorry, but this feature is not implemented yet'
            : 'Checkout'}
        </button>
      </div>
    </div>
  );
};
