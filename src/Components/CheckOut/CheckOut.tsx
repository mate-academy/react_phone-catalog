import { useState } from 'react';
import './CheckOut.scss';

type Props = {
  totalPrice: number;
  numberOfProducts: number;
};

export const CheckOut: React.FC<Props> = ({ totalPrice, numberOfProducts }) => {
  const [checkOutPress, setCheckOutPress] = useState(false);
  const [checkOutHide, setCheckOutHide] = useState(false);

  return (
    <>
      <div className="CheckOut">
        <h1 className="CheckOut__price">
          {`$${totalPrice}`}
        </h1>
        <h1 className="CheckOut__text">
          {`Total for ${numberOfProducts} items`}
        </h1>
        <button
          type="button"
          className="CheckOut__btn"
          onClick={() => {
            if (!checkOutPress) {
              setCheckOutPress(true);
            } else {
              setCheckOutHide(true);
              setTimeout(() => {
                setCheckOutPress(false);
                setCheckOutHide(false);
              }, 500);
            }
          }}
        >
          Checkout
        </button>
      </div>
      {
        checkOutPress && (
          <div className={`NotImplemented ${checkOutHide && 'dissapear'}`}>
            <p className="NotImplemented__text">
              We are sorry, but this feature is not implemented yet
            </p>
          </div>
        )
      }
    </>
  );
};
