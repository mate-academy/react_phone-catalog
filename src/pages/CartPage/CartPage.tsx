/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// @ts-ignore
import arrow from '../../images/icons/disable_arrow.png';

import './CartPage.scss';
import { Product } from '../../types/Product';
import { CartItem } from '../../components/CartItem/CartItem';

export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showMessage, setShowMesessage] = useState(false);

  const sum = cartItems
    .reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheackoutClick = () => {
    setShowMesessage(true);

    setTimeout(() => {
      setShowMesessage(false);
      localStorage.removeItem('CartItems');
    }, 1000);
  };

  useEffect(() => {
    const localCart: Product[] = JSON
      .parse(localStorage.getItem('CartItems') || '[]');

    setCartItems(localCart);
  }, [cartItems]);

  return (
    <div className="cartPage">
      <div className="cartPage__back">
        <img
          src={arrow}
          alt="arrow"
          className="cartPage__icons-left"
        />
        <Link to="/phones" className="cartPage__currentPage">Back</Link>
      </div>

      <h1 className="cartPage__title">Cart</h1>

      {cartItems.length === 0 ? (
        <h1>Your cart is empty</h1>
      ) : (
        <>
          <div className="cartPage__components">

            <div className="cartPage__items">
              {cartItems.map(item => (
                <CartItem key={item.id} cartProduct={item} />
              ))}
            </div>

            <div className="cartPage__rightPart">
              <div className="cartPage__total">
                <h1 className="cartPage__totalPrice">{`$${sum}`}</h1>
                <div className="cartPage__totalItemsComponent">
                  <p className="cartPage__totalItems">{`Total for ${quantity} items`}</p>
                  <p className="cartPage__line" />
                </div>
                <button
                  type="button"
                  className="cartPage__checkoutButton"
                  onClick={handleCheackoutClick}
                >
                  Checkout
                </button>
              </div>
              {showMessage && (
                <h1
                  className="cartPage__checkoutError"
                >
                  We are sorry, but this feature is not implemented yet
                </h1>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
