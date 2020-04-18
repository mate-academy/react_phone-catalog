import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';

import './Cart.css';

import { CartPhoneCard } from '../CartPhoneCard/CartPhoneCard';

interface StateProps {
  phonesCart: string[];
  phones: PhonesWithDetails[];
  totalPrice: number;
  totalQuantity: number;
}

export const CartTemplate: FC<StateProps> = ({
  phonesCart, phones, totalPrice, totalQuantity,
}) => {
  const cartList = useMemo(() => {
    return phones.filter(phone => phonesCart.includes(phone.phoneId));
  }, [phonesCart, phones]);

  return (
    <div className="cart__container">
      <div className="phones__path">
        <img src="./img/Home.png" alt="home_icon" className="home-icon" />
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
            <CartPhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
        {cartList.length ? (
          <div className="cart__total-price">
            <p className="price__amount">{`$${totalPrice}`}</p>
            <p className="price__title">{`Total for ${totalQuantity} items`}</p>
            <hr color="#E2E6E9" className="price__line" />
            <button type="button" className="price__button-checkout">
              Checkout
            </button>
          </div>
        ) : (
          <p className="cart__empty">Cart is empty</p>
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

export const Cart = connect<StateProps, null, {}, State>(
  mapStateToProps, null,
)(CartTemplate);
