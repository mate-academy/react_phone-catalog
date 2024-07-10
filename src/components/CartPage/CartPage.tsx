import React, { useContext, useEffect, useState } from 'react';
import arrowLight from '../../images/arrow-rigth-light.svg';
import arrowDark from '../../images/arrow-right-dark.svg';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import { CartContext } from '../CartProvider/CartProvider';
import { CartItem } from './CartItem/CartItem';
import './CartPage.scss';
import cartEmpty from '../../images/cart-is-empty.png';

export const CartPage = () => {
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);
  const { cart, setCartLength } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(
    cart.reduce((acc, product) => acc + product.price, 0),
  );
  const [totalCount, setTotalCount] = useState(cart.length);
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    setTotalCount(cart.length);
    setTotalPrice(cart.reduce((acc, product) => acc + product.price, 0));
  }, [cart]);

  useEffect(() => {
    setCartLength(totalCount);
  }, [totalCount]);

  return (
    <main className={getClassName('cart-page')}>
      <div onClick={handleGoBack} className={getClassName('back-link')}>
        <img src={light ? arrowLight : arrowDark} alt="Back" />
        Back
      </div>

      <h1 className={getClassName('cart-page-header')}>
        {!!cart.length ? 'Cart' : 'Your cart is empty'}
      </h1>

      {!!cart.length ? (
        <div className={getClassName('cart-page-block')}>
          <div className={getClassName('cart-page-block-products')}>
            {cart.map(product => (
              <CartItem
                key={product.id}
                product={product}
                setPrice={setTotalPrice}
                setTotalCount={setTotalCount}
              />
            ))}
          </div>

          <div className={getClassName('cart-page-block-priceBox')}>
            <h2 className={getClassName('cart-page-block-priceBox-price')}>
              {`$${totalPrice}`}
            </h2>
            <p className={getClassName('cart-page-block-priceBox-undertext')}>
              {`Total for ${totalCount} ${totalCount > 1 ? 'items' : 'item'}`}
            </p>

            <div className={getClassName('line')}>{''}</div>

            <button className={getClassName('cart-page-block-priceBox-button')}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <img src={cartEmpty} className="emptyCart" />
      )}
    </main>
  );
};
