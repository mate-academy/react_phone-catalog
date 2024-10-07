/* eslint-disable no-param-reassign */
import './CartPage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartList } from '../../components/CartList';
import { UseAppDispatch, useAppSelector } from '../../utils/store';
import { useState } from 'react';
import { actions as cartActions } from '../../utils/cart';

export const CartPage = () => {
  const cart = useAppSelector(state => state.cart);
  let check = 0;
  const location = useLocation();
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(false);
  const dispatch = UseAppDispatch();
  const clear = () => dispatch(cartActions.clear());

  cart.map(el => (check += el.price));

  const BackNavigate = () => {
    if (location.key === 'default') {
      return navigate('..');
    }

    return navigate(-1);
  };

  return (
    <div className="cart" id="cart">
      <Header />
      <div className="container">
        <div className="cart__breadcrumbs">
          <div
            className="left__arrow"
            style={{ cursor: 'pointer' }}
            onClick={() => BackNavigate()}
          ></div>
          <div
            className="breadcrumbs__paragraph back__paragraph"
            onClick={() => BackNavigate()}
          >
            Back
          </div>
        </div>

        <h1 className="cartpage__title title">Cart</h1>

        {cart.length > 0 ? (
          <main className="cart__main">
            <CartList products={cart} />

            <div className="checkout">
              <h2 className="checkout__price">${check}</h2>
              <p className="checkout__total">Total for {cart.length} items</p>
              <button
                className="checkout__button"
                onClick={() => setCheckout(true)}
              >
                Checkout
              </button>
            </div>
          </main>
        ) : (
          <h1 className="emptylist__title">Your cart is empty</h1>
        )}
      </div>

      {checkout && (
        <div className="checkout__modal__wrapper">
          <div className="checkout__modal">
            <h2 className="checkout__modal__title">
              Checkout is not implemented yet.
            </h2>
            <p className="checkout__modal__description">
              Do you want to clear the Cart?
            </p>
            <div className="checkout__modal__buttons">
              <button
                className="checkout__modal__confirm__button"
                onClick={() => {
                  clear();
                  setCheckout(false);
                }}
              >
                Clear
              </button>
              <button
                className="checkout__modal__cancel__button"
                onClick={() => setCheckout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
