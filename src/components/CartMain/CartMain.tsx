import React, { FC } from 'react';
import './_CartMain.scss';
import { connect } from 'react-redux';
import { CartInterface, CartState } from '../../constants/types';
import { CartThumb } from '../CartThumb';
import { getCart } from '../../store/reducers/cartReducer';
import { BackPath } from '../BackPath/BackPath';

interface Props {
  cart: CartInterface[];
}

export const CartMainTemplate: FC<Props> = (props) => {
  const { cart } = props;

  return (
    <section className="cart">
      <div className="cart__container wrapper">
        <BackPath />
        <h3 className="cart__title">Cart</h3>
        {!cart.length ? (
          <h3>No phones in cart</h3>
        ) : (
          <div className="cart__box-big">
            <div className="cart__catalog">
              {
                cart
                  .map((phone: CartInterface) => (
                    <CartThumb
                      key={phone.id}
                      phone={phone}
                    />
                  ))
              }
            </div>

            <div className="cart__box">
              <div className="cart__text-box">
                <span className="cart__price">
                $
                  {
                    cart
                      .reduce((acc, item) => acc + item.amount * item.price, 0)
                  }
                </span>
                <span className="cart__info">
                  {`Total for ${cart.length}`}
                  {cart.length === 1 ? ` item` : ` items`}
                </span>
              </div>
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

const mapStateToProps = (state: {
  cartReducer: CartState;
}) => ({
  cart: getCart(state.cartReducer),
});

// eslint-disable-next-line max-len
export const CartMain = connect(mapStateToProps)(CartMainTemplate);
