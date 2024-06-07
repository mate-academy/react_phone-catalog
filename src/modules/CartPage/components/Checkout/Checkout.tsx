import React, { SetStateAction, useContext, useMemo } from 'react';
import './Checkout.scss';
import { StateContext } from '../../../../contexts/AppContext/AppContext';
import {
  ThemeContext,
  ThemeType,
} from '../../../../contexts/ThemeContext/ThemeContext';
import classNames from 'classnames';

type Props = {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};

export const Checkout: React.FC<Props> = ({ setShowModal }) => {
  const { theme } = useContext(ThemeContext);
  const { cart } = useContext(StateContext);

  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = item.product.price * item.quantity;

    return acc + itemPrice;
  }, 0);

  const totalItems = cart.reduce((acc, item) => item.quantity + acc, 0);

  const items = useMemo(() => {
    return totalItems === 1 ? 'item' : 'items';
  }, [totalItems]);

  return (
    <div className="checkout">
      {' '}
      <div className="checkout__wrap">
        <div className="checkout__total">
          <p className="checkout__totalPrice h3">{`$${totalPrice}`}</p>
          <p className="checkout__items">{`Total for ${totalItems} ${items}`}</p>
        </div>
        <span className="checkout__detail" />
        <button
          className={classNames('checkout__button', {
            dark: theme === ThemeType.DARK,
          })}
          onClick={() => setShowModal(true)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
