import React, { FC, useMemo, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Cart.css';

import { CartPhoneCard } from '../CartPhoneCard/CartPhoneCard';

import {
  deleteCartId as deleteCartIdStore,
  setPriceToAmount as setPriceToAmountStore,
  setQuantityToTotal as setQuantityToTotalStore,
} from '../../store/ActionCreators';

interface StateProps {
  phonesCart: Cart;
  phones: PhonesWithDetails[];
  totalPrice: number;
  totalQuantity: number;
}

interface DispatchProps {
  deleteCartId: (value: Cart) => void;
  setPriceToAmount: (value: number) => void;
  setQuantityToTotal: (value: number) => void;
}

export const CartTemplate: FC<StateProps & DispatchProps> = ({
  phonesCart,
  phones,
  totalPrice,
  totalQuantity,
  deleteCartId,
  setPriceToAmount,
  setQuantityToTotal,
}) => {
  const [checkout, setCheckout] = useState(false);
  const cartList = useMemo(() => {
    return phones
      .filter(phone => Object.keys(phonesCart).includes(phone.phoneId));
  }, [phonesCart, phones]);

  const buyPhones = useCallback(() => {
    setCheckout(true);
    deleteCartId({});
    setPriceToAmount(-totalPrice);
    setQuantityToTotal(-totalQuantity);
  }, [
    totalPrice,
    totalQuantity,
    setPriceToAmount,
    setQuantityToTotal,
    deleteCartId,
  ]);

  return (
    <div className="cart__container">
      <div className="phones__path">
        <NavLink
          to="/"
          className="home-icon__link"
          exact
        >
          <img src="./img/Home.png" alt="home_icon" className="home-icon" />
        </NavLink>
        <img
          src="./img/Chevron.png"
          alt="arrow_icon"
          className="arrow-icon"
        />
        <span className="phones__path-title">Cart</span>
      </div>
      <h2 className="phones__heding">Cart</h2>
      <div className="cart__content">
        <div className="cart__phones-list">
          {cartList.map(phone => (
            <CartPhoneCard
              key={phone.id}
              phone={phone}
              phoneQuantity={phonesCart[phone.phoneId]}
              phonesCart={phonesCart}
            />
          ))}
        </div>
        {checkout && <h2 className="cart__checkout">Thank you for buiyng!</h2>}
        {!checkout && cartList.length ? (
          <div className="cart__total-price">
            <p className="price__amount">{`$${totalPrice}`}</p>
            <p className="price__title">{`Total for ${totalQuantity} items`}</p>
            <hr color="#E2E6E9" className="price__line" />
            <button
              type="button"
              className="price__button-checkout"
              onClick={buyPhones}
            >
              Checkout
            </button>
          </div>
        ) : (
          !checkout && <p className="cart__empty">Cart is empty</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  phonesCart: state.phonesCart,
  phones: state.phones,
  totalPrice: state.totalPrice,
  totalQuantity: state.totalQuantity,
});

const mapDispatchToProps = {
  deleteCartId: deleteCartIdStore,
  setPriceToAmount: setPriceToAmountStore,
  setQuantityToTotal: setQuantityToTotalStore,
};

export const Cart = connect<StateProps, DispatchProps, {}, State>(
  mapStateToProps, mapDispatchToProps,
)(CartTemplate);
