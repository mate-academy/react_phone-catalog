// src/components/pages/ProductPage/ShoppingCart/ShoppingCart.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ShoppingCart.scss';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cartContextHelpers';
import { Modal } from './Checkout/Checkout';

export const ShoppingCart = () => {
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const closeModal = () => {
    setShowModal(false);
    setAdded(false);
  };

  const totalSum = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  const totalItems = cartItems.reduce(
    (count, item) => count + Number(item.quantity),
    0,
  );

  const navigate = useNavigate();

  return (
    <>
      <div className="shopping-container">
        <div className="shopping-page">
          <p className="products-list-title-page">
            <img
              src="./images/icons/Chevron_Arrow_Left_Disabled.svg"
              className="product-list-arrow-one"
              alt="Arrow_Right"
            />
            <button onClick={() => navigate(-1)} className="back-button ">
              <p className="hover-link hover-link-text">Back</p>
            </button>
          </p>
        </div>
        <div className="shopping-title">Cart</div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img
            src="./images/pages/cart-is-empty.png"
            alt="Empty Cart"
            className="empty-cart-image"
          />
        </div>
      ) : (
        <div className="shopping-cart-container">
          <div className="shopping-box">
            <div className="shopping-box-left">
              {cartItems.map((item, index) => (
                <Link
                  to={`/${item.category}/${item.id}`}
                  key={index}
                  className="shopping-cart"
                >
                  <div className="shopping-box-1-2">
                    <div
                      className="shopping-icon"
                      onClick={e => {
                        e.preventDefault();
                        removeFromCart(item.id, item.color, item.capacity);
                      }}
                    >
                      <div className="shopping-box-left-element">
                        <img
                          src="./images/icons/Close.svg"
                          className="shopping-cart-icon"
                          alt="Remove"
                        />
                      </div>
                    </div>
                    <div className="shopping-foto">
                      <img
                        src={`./${item.image}`}
                        alt={item.name}
                        className="shopping-cart-foto"
                      />
                    </div>
                    <div className="shopping-name">
                      <p>{item.name}</p>
                    </div>
                  </div>

                  <div className="shopping-button-and-summa">
                    <div className="shopping-box-3-4">
                      <div className="shopping-button">
                        <button
                          className="shopping-button-left"
                          onClick={e => {
                            e.preventDefault();
                            updateQuantity(
                              item.id,
                              item.color,
                              item.capacity,
                              'decrease',
                            );
                          }}
                        >
                          <img
                            src="./images/icons/Minus.svg"
                            className="shopping-button-icon"
                            alt="Decrease"
                          />
                        </button>
                        <div className="shopping-button-icon-quantity">
                          {item.quantity}
                        </div>
                        <button
                          className="shopping-button-right"
                          onClick={e => {
                            e.preventDefault();
                            updateQuantity(
                              item.id,
                              item.color,
                              item.capacity,
                              'increase',
                            );
                          }}
                        >
                          <img
                            src="./images/icons/Plus.svg"
                            className="shopping-button-icon"
                            alt="Increase"
                          />
                        </button>
                      </div>
                      <div className="shopping-left-summa">
                        ${Number(item.price) * Number(item.quantity)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="shopping-box-right">
              <div className="shopping-box-right-in">
                <div className="shopping-total">${totalSum}</div>
                <div className="shopping-total-items">
                  Total for {totalItems} item{totalItems !== 1 ? 's' : ''}
                </div>
                <div className="shopping-total-border"></div>

                <div className="shopping_card_button">
                  <button
                    className={`shopping_card_button_add ${added ? 'added' : ''}`}
                    onClick={e => {
                      e.preventDefault();
                      setAdded(true);
                      setShowModal(true);
                    }}
                  >
                    {added ? 'loading...' : 'Checkout'}
                  </button>
                </div>

                {showModal && (
                  <Modal
                    onClose={closeModal}
                    onSuccess={clearCart} // очищаємо корзину після підтвердження //
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
