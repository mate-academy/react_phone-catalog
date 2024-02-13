import { useState } from 'react';
import './cart-info.scss';
import classNames from 'classnames';

type Props = {
  totalAmount: number,
  totalQnty: number,
};

export const CartInfo: React.FC<Props> = ({ totalAmount, totalQnty }) => {
  const [isButtonActive, setIsButtonActive] = useState(true);

  return (
    <div className="cart-total__block">
      <p className="total-price">{`${totalAmount}$`}</p>
      {totalQnty === 1
        ? <p className="total-item">{`Total for ${totalQnty} item`}</p>
        : <p className="total-item">{`Total for ${totalQnty} items`}</p> }
      <button
        type="button"
        className={classNames(
          'button primary__button total-price__button',
          { active: !isButtonActive },
        )}
        onClick={() => setIsButtonActive(!isButtonActive)}
      >
        {isButtonActive
          ? 'Checkout'
          : 'We are sorry, but this feature is not implemented yet'}
      </button>
    </div>
  );
};
