import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Title from './Title';
import {
  RootState, getCart, getAllPhones, loadPhones,
} from '../store';
import { Phones } from '../interfaces/interfaces';

type Props = {
  phonesLoad: () => void;
  phones: Phones[];
  cart: any;
};

const Cart: FC<Props> = ({ phonesLoad, phones, cart }) => {
  useEffect(() => {
    phonesLoad();
  }, [phonesLoad]);

  const overall: number[] = [];

  phones
    .filter(phone => cart.find((item: string) => phone.phoneId === item))
    .filter(phone => overall.push(phone.priceDiscount));

  return (
    <div className="cart">
      <NavLink to="/" className="cart__breadcrumb-link">
        <div className="cart__breadcrumb">
          <img
            src="img/icons/breadcrumbs-arrow.svg"
            alt="back icon"
            className="cart__breadcrumb-arrow"
          />
          <p className="cart__breadcrumb-text">Back</p>
        </div>
      </NavLink>
      <Title title="Cart" />

      {
        cart.length
          ? (
            <div className="cart__container">
              <div className="cart__items">
                {
                  phones
                    .filter(phone => cart.find((item: string) => phone.phoneId === item))
                    .map(phone => (
                      <div className="cart__phone">
                        <button
                          type="button"
                          className="cart__remove"
                        >
                          <img src="img/icons/remove.svg" alt="remove icon" />
                        </button>
                        <img
                          src={phone.image}
                          alt={phone.name}
                          className="cart__phone-img"
                        />
                        <p className="cart__phone-name">
                          {phone.name}
                        </p>
                        <div className="cart__phone-amount">
                          <button
                            type="button"
                            className="cart__phone-amount-btn"
                          >
                            -
                          </button>
                          <p className="cart__phone-amount-text">
                            1
                          </p>
                          <button
                            type="button"
                            className="cart__phone-amount-btn"
                          >
                            +
                          </button>
                        </div>
                        <h2>
                          $
                          {phone.priceDiscount}
                        </h2>
                      </div>
                    ))
                }
              </div>
              <div className="cart__overall">
                <div className="cart__overall-container">
                  <h2 className="cart__overall-sum">
                    $
                    {overall.reduce((a: number, b: number) => {
                      return a + b;
                    }, 0)}
                  </h2>
                  <p className="cart__overall-extra">
                    Total for
                    {' '}
                    {cart.length}
                    {' '}
                    items
                  </p>
                </div>
                <button
                  type="button"
                  className="cart__checkout-btn"
                >
                  Checkout
                </button>
              </div>
            </div>
          )
          : (
            <h3 className="cart__oops">
              Add your first purchase here
              <span role="img" aria-label="Grinny">🛒</span>
            </h3>
          )
      }
    </div>
  );
};

const mapState = (state: RootState) => ({
  phones: getAllPhones(state),
  cart: getCart(state),
});

const mapDispatch = {
  phonesLoad: loadPhones,
};

export default connect(mapState, mapDispatch)(Cart);
