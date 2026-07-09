import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';

export const CartPage = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [isBlank, setIsBlank] = useState(false); // Стан перенесли нагору

  // Додаємо базу для GitHub Pages
  const baseUrl = import.meta.env.BASE_URL;

  const totalPrice = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );

  const handleNakedRedirect = () => {
    setIsBlank(true); // Робимо екран "голим"
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  if (isBlank) {
    return (
      <div
        className="cart-page__cart-empty"
        style={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>Order successfully placed!</h2>
        {/* Додано baseUrl + / */}
        <img
          className="cart-page__cart-empty__photo"
          src={`${baseUrl}/img/cart-is-empty.png`}
          alt="Success"
        />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page__cart-empty">
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
        {/* Додано baseUrl + / */}
        <img
          className="cart-page__cart-empty__photo"
          src={`${baseUrl}/img/cart-is-empty.png`}
          alt="Cart is empty"
        />
      </div>
    );
  }

  // ОСНОВНА СТОРІНКА КОШИКА
  return (
    <div className="cart-page">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>

      <h1 className="cart-page__title">Cart</h1>

      <div className="cart-page__cart-container">
        {/* Секція 1: Список товарів зліва */}
        <div className="cart-page__cart-container__cart-list">
          {cart.map((item: any) => (
            <div
              key={item.id}
              className="cart-page__cart-container__cart-list__cart-card"
            >
              <button
                onClick={() => removeItem(item.id)}
                className="cart-page__cart-container__cart-list__cart-card__remove"
              >
                ×
              </button>

              <div className="cart-page__cart-container__cart-list__cart-card__info">
                {/* Додано baseUrl + / для картинки товару */}
                <img
                  src={`${baseUrl}/${item.image}`}
                  alt={item.name}
                  className="cart-page__cart-container__cart-list__cart-card__img"
                />
                <p className="cart-page__cart-container__cart-list__cart-card__name">
                  {item.name}
                </p>
              </div>

              <div className="cart-page__cart-container__cart-list__cart-card__actions">
                <div className="cart-page__cart-container__cart-list__cart-card__actions__quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>

                <h2 className="cart-page__cart-container__cart-list__cart-card__price">
                  ${item.price * item.quantity}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Секція 2: Checkout */}
        <div className="cart-page__cart-container__checkout-section">
          <h1 className="cart-page__cart-container__checkout-section__total">
            ${totalPrice}
          </h1>
          <p className="cart-page__cart-container__checkout-section__count">
            Total for {totalItems} items
          </p>
          <div className="cart-page__cart-container__checkout-section__divider" />

          {/* Твоя кнопка працює ідеально */}
          <button
            className="cart-page__cart-container__checkout-section__btn"
            onClick={handleNakedRedirect}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
