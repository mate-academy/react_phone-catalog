import React, { FC } from 'react';
import './_CartMain.scss';
import { connect } from 'react-redux';
import { PhoneInterface, State } from '../../constants/types';
import { CartThumb } from '../CartThumb';
import { getCart } from '../../store/rootReducer';

interface Props {
  cart: PhoneInterface[];
}

export const CartMainTemplate: FC<Props> = (props) => {
  const { cart } = props;

  return (
    <section className="cart">
      <div className="cart__container wrapper">
        <span className="cart__back">back</span>
        <h3 className="cart__title">Cart</h3>
        {!cart.length ? (
          <h3>No phones in cart</h3>
        ) : (
          <div className="cart__box-big">
            <div className="cart__catalog">
              {
                cart
                  .map((phone: PhoneInterface) => (
                    <CartThumb
                      key={phone.id}
                      phone={phone}
                    />
                  ))
              }
            </div>

            <div className="cart__box">
              <span className="cart__price">$999</span>
              <span className="cart__info">
                {`Total for ${cart.length} items`}
              </span>
              <button
                type="button"
                className="cart__btn-chechout"
              >
          Checkout
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

const mapStateToProps = (state: State) => ({
  cart: getCart(state),
});

// eslint-disable-next-line max-len
export const CartMain = connect(mapStateToProps)(CartMainTemplate);
