import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Title from './Title';
import {
  RootState,
  getCart,
  getAllPhones,
  loadPhones,
  removeFromCart,
  decreaseAmount,
  increaseAmount,
  loadPhone,
} from '../store';
import { Phones } from '../interfaces/interfaces';

type Props = {
  phonesLoad: () => void;
  removeItem: (phoneId: string) => void;
  decrease: (phoneId: string) => void;
  increase: (phoneId: string) => void;
  setCurrentPhone: (id: string) => void;
  phones: Phones[];
  cart: any;
};

const Cart: FC<Props> = ({
  phonesLoad, removeItem, decrease, increase, phones, cart, setCurrentPhone,
}) => {
  useEffect(() => {
    phonesLoad();
  }, [phonesLoad]);

  const overall: number[] = [];

  phones
    .filter(phone => cart.find((item: { id: string }) => phone.phoneId === item.id))
    .filter(phone => overall.push(phone.priceDiscount * cart
      .find((item: { id: string }) => item.id === phone.phoneId)
      .quantity));

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
                    .filter(phone => cart.find((item: { id: string }) => phone.phoneId === item.id))
                    .map(phone => (
                      <div className="cart__phone">
                        <button
                          type="button"
                          className="cart__remove"
                          onClick={() => removeItem(phone.phoneId)}
                        >
                          <img src="img/icons/remove.svg" alt="remove icon" />
                        </button>
                        <img
                          src={phone.image}
                          alt={phone.name}
                          className="cart__phone-img"
                        />
                        <NavLink
                          to={`/phones/${phone.phoneId}`}
                          className="cart__phone-name"
                          onClick={() => setCurrentPhone(phone.phoneId)}
                        >
                          {phone.name}
                        </NavLink>
                        <div className="cart__phone-amount">
                          <button
                            type="button"
                            className="cart__phone-amount-btn"
                            onClick={() => decrease(phone.phoneId)}
                          >
                            -
                          </button>
                          <p className="cart__phone-amount-text">
                            {
                              cart
                                .find((item: { id: string }) => item.id === phone.phoneId)
                                .quantity
                            }
                          </p>
                          <button
                            type="button"
                            className="cart__phone-amount-btn"
                            onClick={() => increase(phone.phoneId)}
                          >
                            +
                          </button>
                        </div>
                        <h2>
                          $
                          {
                            phone.priceDiscount * cart
                              .find((item: { id: string }) => item.id === phone.phoneId)
                              .quantity
                          }
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
  removeItem: removeFromCart,
  decrease: decreaseAmount,
  increase: increaseAmount,
  setCurrentPhone: loadPhone,
};

export default connect(mapState, mapDispatch)(Cart);
