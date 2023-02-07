import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../../components/CartItem/CartItem';
import { Error } from '../../components/Error/Error';
import { Context } from '../../helpers/ContextProvider';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const { cart } = useContext(Context);
  const navigate = useNavigate();

  const totalPrice = cart?.map(product => {
    const coefficient = (100 - product.discount) / 100;

    return Math.round(product.price * coefficient * product.quantity);
  })
    .reduce((a, b) => a + b);

  const totalQuantity = cart
    ?.map(product => product.quantity)
    .reduce((a, b) => a + b);

  return (
    <div className="container cart-page">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="breadcrumps cart-page__back"
      >
        <img
          src="../assets/arrow-prev.svg"
          alt="prev-icon"
          className="breadcrumps__item"
        />
        <p className="text__small text__small--secondary breadcrumps__item">
          Back
        </p>
      </button>

      <h1 className="title__h1 title__h1--primary cart-page__title">
        Cart
      </h1>
      {cart ? (
        <div className="cart-page__content">
          <section className="cart-page__list">
            {cart.map(product => (
              <CartItem product={product} />
            ))}
          </section>
          <section className="cart-page__checkout">
            <p className="title__h2 title__h1--primary cart-page__total">
              {`$${totalPrice}`}
            </p>
            <span
              className="text__body text__body--primary cart-page__quantity"
              data-cy="productQauntity"
            >
              {`Total for ${totalQuantity} items`}
            </span>
            <span className="line cart-page__line" />
            <Link
              to="/checkout"
              className="button button--is-dark cart-page__submit"
            >
              Checkout
            </Link>
          </section>
        </div>
      ) : (
        <div className="cart-page__notification">
          <Error text="Your cart is empty" />
        </div>
      )}

    </div>
  );
};
