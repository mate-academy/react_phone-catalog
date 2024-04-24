import React from 'react';
import {
  ArrowLeft,
  ButtonCartActive,
  ButtonCartDelete,
  ButtonCartDisabled,
  ButtonsAddToCart,
} from '../../components/Buttons/Button';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  return (
    <div className="container">
      <section className="cart">
        <Link to="/back" className="cart__back">
          <ArrowLeft />
          Back
        </Link>

        <h1 className="cart__title">Cart</h1>

        <div className="cart__main">
          <div className="cart__product">
            <div className="cart__product-top">
              <ButtonCartDelete />

              <img
                src="./img/phones/apple-iphone-11-pro/gold/00.webp"
                alt="iphone"
                className="cart__product-img"
              />

              <span className="cart__product-title">
                Apple iPhone 14 Pro 128GB Silver (MQ023)
              </span>
            </div>

            <div className="cart__product-block">
              <div className="cart__product-block-temp">
                <ButtonCartDisabled />
                1
                <ButtonCartActive />
              </div>

              <div className="cart__product-price">$999</div>
            </div>
          </div>

          <div className="cart__total">
            <h2 className="cart__total-price">$2657</h2>
            <span className="cart__total-span">Total for 3 items</span>

            <span className="cart__total-border"></span>

            <ButtonsAddToCart title={`Checkout`} size={`large`} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
