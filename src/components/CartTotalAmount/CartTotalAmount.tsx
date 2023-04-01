import { FC, useState } from 'react';
import { CardItem } from '../../types/CardItem';
import { warningTimer } from '../../utils/warningTimer';

type Props = {
  cart: CardItem[];
};

export const CartTotalAmount: FC<Props> = ({
  cart,
}) => {
  const [warning, setWarning] = useState(false);

  const totalPrice = cart.map((product: CardItem) => {
    return product.price * product.count;
  }).reduce((a: number, b: number) => a + b, 0);

  const isWarning = () => {
    setWarning(true);
    warningTimer(setWarning, false, 3000);
  };

  return (
    <div className="cart__total">
      {warning && (
        <p>
          We are sorry, but this feature is not implemented yet.
        </p>
      )}
      <h2 className="cart__total-amout">{`$${totalPrice}`}</h2>
      <p className="cart__total-items">{`Total for ${cart} items`}</p>
      <button
        className="cart__total-button"
        type="button"
        onClick={() => isWarning()}
      >
        Checkout
      </button>
    </div>
  );
};
