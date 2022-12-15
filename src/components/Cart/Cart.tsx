import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { BackButton } from '../UI/BackButton';
import { CartItem } from './CartItem';
import './Cart.scss';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('cart');

    if (data) {
      setCartItems(JSON.parse(data));
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      {!isLoaded ? (
        <ReactLoading type="bubbles" color="#313237" />
      ) : (
        <div className="cart">
          <BackButton />
          {cartItems.length === 0 ? (
            <h3>empty</h3>
          ) : (
            <>
              <h1 className="cart__title">Cart</h1>
              <div className="cart__container">
                <div className="cart__items">
                  {cartItems.map(item => (
                    <CartItem key={item} cartItem={item} />
                  ))}
                </div>
                <div className="cart__total">
                  <h1 className="cart__total-price">$3297</h1>
                  <span className="cart__items-count">Total for 3 items</span>
                  <button
                    type="button"
                    className="cart__checkout"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
