import { NavLink } from 'react-router-dom';
import './CartPage.scss';
import { useCart } from '../CartContext/CartContext';
import { Gargets } from '../../interface/Gargets';
import { useState, useEffect } from 'react';

export const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [clickOnCheckout, setClickOnCheckout] = useState(false);
  const [cartWithCount, setCartWithCount] = useState(
    cartItems.map(item => ({ ...item, count: 1 })),
  );

  useEffect(() => {
    const storedCart = localStorage.getItem('cartWithCount');

    if (storedCart) {
      setCartWithCount(JSON.parse(storedCart));
    } else {
      setCartWithCount(cartItems.map(item => ({ ...item, count: 1 })));
    }
  }, [cartItems]);

  // збереження в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem('cartWithCount', JSON.stringify(cartWithCount));
  }, [cartWithCount]);

  const deletePhone = (itemToDelete: Gargets) => {
    removeFromCart(itemToDelete.id);
    setCartWithCount(prev => prev.filter(item => item.id !== itemToDelete.id));
  };

  const handleIncrement = (id: string) => {
    setCartWithCount(prev =>
      prev.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id: string) => {
    setCartWithCount(prev =>
      prev.map(item =>
        item.id === id ? { ...item, count: Math.max(1, item.count - 1) } : item,
      ),
    );
  };

  const total = cartWithCount.reduce(
    (sum, item) => sum + item.priceRegular * item.count,
    0,
  );

  return (
    <div className="cart">
      <div className="cart__nav">
        <span className="cart__arrow"></span>
        <NavLink to="/phones" className="cart__back">
          Back
        </NavLink>
      </div>

      <h2 className="cart__h2">Cart</h2>
      <div className="cart__block">
        <div className="cart__items">
          {cartWithCount.length === 0 && (
            <img
              src="./img/cart-is-empty.png"
              alt="cart__empty"
              className="cart__empty"
            />
          )}
          {cartWithCount.map((item, index) => (
            <div key={index} className="cart__position">
              <div className="cart__close">
                <img
                  src="./img/Close.png"
                  alt="close-button"
                  onClick={() => deletePhone(item)}
                />
              </div>
              <img src={item.images[0]} alt="" className="cart__image" />
              <h3 className="cart__name-garget">{item.name}</h3>
              <div className="cart__counter">
                <button
                  className="cart__button-minus"
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </button>
                <div className="cart__count-garget">{item.count}</div>
                <button
                  className="cart__button-plus"
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </button>
              </div>
              <div className="cart__cost">
                ${item.priceRegular * item.count}
              </div>
            </div>
          ))}
        </div>

        {cartWithCount.length > 0 && (
          <div className="cart__block-total">
            <div className="cart__total-amount">${total}</div>
            <div className="cart__count-item">
              Total for{' '}
              {cartWithCount.reduce((sum, item) => sum + item.count, 0)} items
            </div>
            <div className="cart__small-line"></div>

            <button
              className="cart__button-checkout"
              onClick={() => setClickOnCheckout(true)}
              disabled={clickOnCheckout}
            >
              {clickOnCheckout ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>

      {/* === Модальне вікно винесене окремо — не змінює layout === */}
      {clickOnCheckout && (
        <div className="cart__modal-widnow">
          <p className="cart__questions">Do you want to clear the Cart?</p>
          <div className="cart__position-button">
            <button
              className="cart__button-yes"
              onClick={() => {
                setClickOnCheckout(false);
                cartItems.forEach(item => {
                  deletePhone(item);
                });
              }}
            >
              Yes
            </button>
            <button
              className="cart__button-no"
              onClick={() => setClickOnCheckout(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
