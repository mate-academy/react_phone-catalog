/* eslint-disable max-len */

import React, { useContext, useState } from 'react';
import '../styles/CartPage.scss';

import { Link } from 'react-router-dom';
import { AppContext } from '../components/AppContex';
import { Cart } from '../types/Cart';

export const CartPage = React.memo(() => {
  const { cart, setCart } = useContext(AppContext);

  const [isCheckoutMessageVisible, setIsCheckoutMessageVisible] = useState(false);

  const handleCheckoutClick = () => {
    setIsCheckoutMessageVisible(true);

    setTimeout(() => {
      setIsCheckoutMessageVisible(false);
    }, 4000);
  };

  const handleCountMinus = (item: Cart) => {
    const updatedCart = [...cart];

    const index = updatedCart.findIndex((cartItem) => cartItem.id === item.id);

    if (index !== -1) {
      updatedCart[index] = { ...item, quantity: item.quantity - 1 };

      setCart(updatedCart);
    }
  };

  const handleCountPlus = (item: Cart) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }

      return cartItem;
    });

    setCart(updatedCart);
  };

  const handleRemoveFromCart = (id: string) => {
    const remove = cart.filter(item => item.id !== id);

    setCart(remove);
  };

  const fullPrice = cart.reduce((total, item) => {
    const productPrice = item.product.fullPrice;
    const itemTotal = +productPrice * item.quantity;

    return total + itemTotal;
  }, 0);

  const itemCount = cart.reduce((total, item) => {
    return total + +item.quantity;
  }, 0);

  return (
    <div className="cart">
      <div className="way__back">
        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.47149 0.528606C5.21114 0.268256 4.78903 0.268256 4.52868 0.528606L0.528677 4.52861C0.268327 4.78896 0.268327 5.21107 0.528677 5.47141L4.52868 9.47141C4.78903 9.73176 5.21114 9.73176 5.47149 9.47141C5.73184 9.21107 5.73184 8.78896 5.47149 8.52861L1.94289 5.00001L5.47149 1.47141C5.73184 1.21107 5.73184 0.788955 5.47149 0.528606Z" fill="#313237" />
        </svg>

        <Link to="/phones" className="way__back-link">Back</Link>
      </div>

      {cart.length > 0 ? (
        <>
          <h1 className="cart__title">Cart</h1>

          <div className="cart__content">
            <div className="cart__item">
              {cart.map(item => (
                <div className="cart__container" key={item.id}>
                  <button
                    type="button"
                    className="cart__remove"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <svg className="cart__remove-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" fill="#B4BDC4" />
                    </svg>
                  </button>

                  <div className="cart__photo-container">
                    <img
                      className="cart__photo"
                      src={`https://mate-academy.github.io/react_phone-catalog/_new/${item.product.image}`}
                      alt=""
                    />
                  </div>

                  <div className="cart__name">{item.product.name}</div>

                  <div className="cart__count">
                    <button
                      className="cart__count-button"
                      type="button"
                      disabled={item.quantity < 2}
                      onClick={() => handleCountMinus(item)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z" fill={item.quantity < 2 ? '#B4BDC4' : '#313237'} />
                      </svg>
                    </button>

                    <div className="cart__count-value">{item.quantity}</div>

                    <button
                      className="cart__count-button"
                      type="button"
                      onClick={() => handleCountPlus(item)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.6665 3.33334C8.6665 2.96515 8.36803 2.66667 7.99984 2.66667C7.63165 2.66667 7.33317 2.96515 7.33317 3.33334V7.33334H3.33317C2.96498 7.33334 2.6665 7.63182 2.6665 8.00001C2.6665 8.3682 2.96498 8.66667 3.33317 8.66667H7.33317V12.6667C7.33317 13.0349 7.63165 13.3333 7.99984 13.3333C8.36803 13.3333 8.6665 13.0349 8.6665 12.6667V8.66667H12.6665C13.0347 8.66667 13.3332 8.3682 13.3332 8.00001C13.3332 7.63182 13.0347 7.33334 12.6665 7.33334H8.6665V3.33334Z" fill="#313237" />
                      </svg>
                    </button>
                  </div>

                  <div className="cart__price">{`$${+item.product.fullPrice * item.quantity}`}</div>
                </div>
              ))}
            </div>

            <div className="cart__fullPrice">
              <span className="cart__fullPrice-count">{`$${fullPrice}`}</span>

              <span className="mb-24">{`Total for ${itemCount} items`}</span>

              <div className="product-details__main-right__line" />

              <button type="button" className="cart__fullPrice-button" onClick={handleCheckoutClick}>Checkout</button>

              {isCheckoutMessageVisible && (
                <span className="cart__message">We are sorry, but this feature is not implemented yet.</span>
              )}
            </div>
          </div>
        </>
      ) : (
        <h1 className="cart__title">Your cart is empty</h1>
      )}
    </div>
  );
});
