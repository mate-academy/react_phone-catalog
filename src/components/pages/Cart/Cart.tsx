import React from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";

import {useAppSelector} from "../../../app/hooks";

import {CartItemCard} from "../../pages/Cart/CartItemCard/CartItemCard";
import {nanoid} from "nanoid";

export const Cart: React.FC = () => {
  const products = useAppSelector(state => state.cart.products);

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const totalQuantity = products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const navigate = useNavigate();

  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="page__nav">
        <NavLink to="" onClick={handleGoBack} className="page__nav-link">
          <img src={"/img/icons/arrow.svg"} alt="arrow" />
          Back
        </NavLink>
      </div>
      <h1
        className="
        title
        title-cart
        title-custom"
      >
        Cart
      </h1>

      <div className="cart__content">
        {!products.length ? (
          <div className="cart__content__empty">
            <p className="cart__content__empty-text">
              The art of minimalism in your cart has reached its apogee
              <br />
              <span className="cart__content__emptytext-custom">
                Maybe we should disturb this calm a bit?
              </span>
            </p>

            <img
              className="cart__content__empty-img"
              src={"/img/cart/cart.png"}
              alt=""
            />

            <Link to="/" className="custom__link-btn">
              Continue Shoping
            </Link>
          </div>
        ) : (
          <div className="cart__content__container">
            <div className="cart__content__cards">
              <ul className="cart__content__cards__list">
                {products.map(product => (
                  <li key={nanoid()} className="cart__content__cards__item">
                    <CartItemCard product={product} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="cart__content__total">
              <div className="cart__content__total__info">
                <p className="cart__content__total-price">{totalPrice} USD</p>

                <p className="cart__content__total-text">
                  <span>Total</span>
                  for {totalQuantity} pcs
                </p>
              </div>

              <button className="cart__content__total-btn">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
