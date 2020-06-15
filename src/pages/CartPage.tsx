import React from 'react';
import { useSelector } from 'react-redux';
import './Favourites.scss';
import {
  Link,
} from 'react-router-dom';
import { CartItem } from './CartItem';
import { getCartItems, getTotalPrice, getDiscount } from '../store/cart';
import { GoBackButton } from '../components/Buttons/GoBack';

export const CardPage = () => {
  const cartProducts = useSelector(getCartItems);
  const totalPrice = useSelector(getTotalPrice);
  const totalDiscount = useSelector(getDiscount);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="wrap__container">
            <GoBackButton />
          </div>
          <h1 className="Cart__title">
            Cart
          </h1>
          {cartProducts.length === 0
            ? (
              <div className="Cart__noitems">
                <h2>No items in cart</h2>
                <Link to="/home">
                  <button className="total__button" type="button">
                    Back to shoping
                  </button>
                </Link>
                <img src="/img/no-cart-items.jpg" alt="empty Cart" />
              </div>
            )
            : (
              <div className="Cart">
                <div className="Cart__items">
                  {cartProducts.map((product: CartProduct) => (
                    <CartItem cartProduct={product} key={product.product.id} />
                  ))}
                </div>
                <div className="Cart__total total">
                  <h1 className="total__price">{`$${totalPrice}`}</h1>
                  <p className="total__items">{`Total for ${cartProducts.length} items`}</p>
                  <p className="total__discount">{`discount: $${totalDiscount}`}</p>
                  <div className="line" style={{ height: '1px', width: '100%', backgroundColor: '#E2E6E9' }} />
                  <a href="https://api.fondy.eu/api/checkout?button=ag781ui3s09k6ccmdk6bsxjyc52jafgo">
                    <button className="total__button" type="button">Checkout</button>
                  </a>
                </div>
              </div>
            )}
        </div>
      </section>

    </>
  );
};
