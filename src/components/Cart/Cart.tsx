import React, { FC, useEffect } from 'react';
import './_Cart.scss';
import { connect } from 'react-redux';
import { CartInterface, CartState } from '../../constants/types';
import CartCard from '../CartCard/CartCard';
import { getCart } from '../../store/reducers/cartReducer';
import { BackPath } from '../BackPath/BackPath';
import { setCartTrigger } from '../../store/actionCreators';

interface Props {
  cart: CartInterface[];
  setCartTrigger: (value: boolean) => void;
}

const Cart: FC<Props> = (props) => {
  const {
    cart,
    setCartTrigger: setCartTriggerTemplate,
  } = props;

  useEffect(() => {
    if (cart.length) {
      setCartTriggerTemplate(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      setCartTriggerTemplate(false);
    };
  }, []);

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
                    <CartCard
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
                className="cart__btn-checkout"
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

const mapPropsToState = { setCartTrigger };

// eslint-disable-next-line max-len
export default connect(mapStateToProps, mapPropsToState)(Cart);
