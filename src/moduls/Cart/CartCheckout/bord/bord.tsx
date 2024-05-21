import React, { useContext, useEffect } from 'react';
import './bord.scss';
import { DispatchContext } from '../../../../context/ContextReducer';

export const CheckoutBord: React.FC = () => {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const handleClickClose = () => {
    dispatch({ type: 'setCheckout' });
  };

  const handleClickReset = () => {
    dispatch({ type: 'resetCartItems' });
    dispatch({ type: 'setCheckout' });
  };

  return (
    <div className="CheckoutBord">
      <div onClick={handleClickClose} className="CheckoutBord__close"></div>

      <div className="CheckoutBord__bottom">
        <p className="CheckoutBord__title">Do you wanna reset items?</p>

        <div onClick={handleClickReset} className="CheckoutBord__button">
          Reset items
        </div>
      </div>
    </div>
  );
};
