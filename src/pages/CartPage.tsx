import React from 'react';
import { useSelector } from 'react-redux';
import { getCartItems } from '../store/index';
import './Favourites.scss';
import { CartItem } from './CartItem';
import { getTotalPrice, getDiscount } from '../store/cart';

export const CardPage = () => {
  const cartProducts = useSelector(getCartItems);
  const totalPrice = useSelector(getTotalPrice);
  const totalDiscount = useSelector(getDiscount);

  return (
    <>

      <section className="section">
        <div className="container">
          <h1 className="PhonesPage__head">
            Cart
          </h1>
          {cartProducts.length === 0 ? <h1>No items in cart</h1> : (
            <div className="Card">
              <div className="Card__items">
                {cartProducts.map((product: CartProduct) => (
                  <CartItem cartProduct={product} key={product.product.id} />
                ))}
              </div>
              <div className="Card__total total">
                <h1 className="total__price">{`$${totalPrice}`}</h1>
                <p className="total__items">{`Total for ${cartProducts.length} items`}</p>
                <p className="total__discount">{`discount: $${totalDiscount}`}</p>
                <div className="line" style={{ height: '1px', width: '100%', backgroundColor: '#E2E6E9' }} />
                <button className="total__button" type="button">Checkout</button>
              </div>
            </div>
          )}
        </div>
      </section>


    </>
  );
};
