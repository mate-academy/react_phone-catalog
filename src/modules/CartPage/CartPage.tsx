import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartPage.scss';
import React, { useState } from 'react';
import { Popup } from './components';

export const CartPage: React.FC = () => {
  const { cartItems, setCartItems } = useCart();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.amount,
    0,
  );

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.amount, 0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    setIsPopupOpen(true);
    setCartItems([]);
  };

  return (
    <div className="cart">
      {isPopupOpen && <Popup onClose={handleClosePopup} />}
      <div className="cart__content">
        <h1 className="cart__header">Cart</h1>
        <div className="cart__wrap">
          <div className="cart__items">
            <div className="cart__wrapper">
              {cartItems.map(item => {
                const { amount, product } = item;

                return (
                  <React.Fragment key={product.id}>
                    <div className="cart__item">
                      <div className="cart__item--main">
                        <button
                          className="cart__item--button-cross"
                          onClick={() =>
                            setCartItems(prev =>
                              prev.filter(
                                elem => elem.product.id !== product.id,
                              ),
                            )
                          }
                        ></button>
                        <Link
                          className="cart__item--link"
                          to={`/${item.product.category}/${item.product.itemId}`}
                        >
                          <img
                            className="cart__item--image"
                            src={product.image}
                            alt={product.name}
                          />

                          <p className="cart__item--title">{product.name}</p>
                        </Link>
                      </div>

                      <div className="cart__item--buttons">
                        <div className="cart__item--btns">
                          <button
                            className="cart__item--button-amount"
                            onClick={() =>
                              setCartItems(prev => {
                                if (amount === 1) {
                                  return prev.filter(
                                    elem => elem.product.id !== product.id,
                                  );
                                }

                                return prev.map(elem =>
                                  elem.product.id === product.id
                                    ? { ...elem, amount: elem.amount - 1 }
                                    : elem,
                                );
                              })
                            }
                          >
                            -
                          </button>

                          <p>{amount}</p>

                          <button
                            className="cart__item--button-amount"
                            onClick={() =>
                              setCartItems(prev =>
                                prev.map(elem =>
                                  elem.product.id === product.id
                                    ? { ...elem, amount: elem.amount + 1 }
                                    : elem,
                                ),
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <p className="cart__item--price">
                          ${product.price * amount}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="cart__price-container">
            <p className="cart__price--price">${totalPrice}</p>
            <p className="cart__price--text">
              Total for {totalItemsCount} items
            </p>
            <button onClick={handleCheckout} className="cart__price--button">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
