/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect } from 'react';
import { MainContext } from '../../context';
import { BackButton } from '../../components/BackButton';
import './cart-page.scss';
import { CartItem } from '../../components/CartItem/CartItem';
import { scrollToTop } from '../../helpers/scrollToTop';

export const Cart = () => {
  const {
    setCurrentPage,
  } = useContext(MainContext);

  useEffect(() => {
    setCurrentPage('Cart');
    scrollToTop();
  }, []);

  return (
    <div className="cart-page">
      <div className="back-button__wrapper">
        <BackButton />
      </div>
      <h1 className="cart-page__title">Cart</h1>
      <div className="cart-information__wrapper">
        <div className="cart__list">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className="cart-total__block">
          <p className="total-price">3320$</p>
          <p className="total-item">Total for 3 items</p>
          <button
            type="button"
            className="button primary__button total-price__button"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
