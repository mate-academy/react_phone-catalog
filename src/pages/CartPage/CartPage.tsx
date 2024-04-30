import React from 'react';
import {
  ArrowLeft,
  ButtonCartActive,
  ButtonCartDelete,
  ButtonCartDisabled,
  ButtonsCheckout,
} from '../../components/Buttons/Button';
import { Link, useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <section className="cart">
        <Link to="/back" className="cart__back" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Back
        </Link>

        <h1 className="cart__title">Cart</h1>

        <div className="cart__main">
          <div className="cart__product">
            <div className="cart__product-top">
              <ButtonCartDelete />

              <img src="./" alt="phone" className="cart__product-img" />

              <span className="cart__product-title">
                Aplle androind 2013 xpssace
              </span>
            </div>

            <div className="cart__product-block">
              <div className="cart__product-block-temp">
                <ButtonCartDisabled />
                1
                <ButtonCartActive />
              </div>

              <div className="cart__product-price">$438948</div>
            </div>
          </div>

          <div className="cart__total">
            <h2 className="cart__total-price">$2657</h2>
            <span className="cart__total-span">Total for 3 items</span>

            <span className="cart__total-border"></span>

            <ButtonsCheckout />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
