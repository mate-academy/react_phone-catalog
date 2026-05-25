import { useCart } from '../../../Functional/CartContext/CartContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.scss';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = () => {
    clearCart();
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  if (cart.length === 0) {
    return (
      <section className="cart section">
        <div className="cart__back">
          <Link to="/" className="cart__back-link">
            {'< Back'}
          </Link>
        </div>
        <h1 className="cart__title">Cart</h1>
        <p className="cart__empty">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="cart section">
      <div className="cart__back">
        <Link to="/" className="cart__back-link">
          {'< Back'}
        </Link>
      </div>
      <h1 className="cart__title">Cart</h1>
      <div className="cart__content">
        <div className="cart__items">
          {cart.map(item => (
            <div
              key={`${item.id}-${item.color}-${item.capacity}`}
              className="cart__item"
            >
              <button
                className="cart__item-remove-icon"
                onClick={() =>
                  removeFromCart(item.id, item.color, item.capacity)
                }
                aria-label="Remove item"
              >
                ×
              </button>
              <img
                src={item.image}
                alt={item.name}
                className="cart__item-image"
              />
              <div className="cart__item-details">
                <h3 className="cart__item-name">{item.name}</h3>
                <p className="cart__item-spec">Color: {item.color}</p>
                {item.capacity && (
                  <p className="cart__item-spec">Capacity: {item.capacity}</p>
                )}
              </div>
              <div className="cart__item-controls">
                <div className="cart__item-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1,
                        item.color,
                        item.capacity,
                      )
                    }
                    disabled={item.quantity === 1}
                    className="cart__quantity-btn"
                  >
                    -
                  </button>
                  <span className="cart__quantity-display">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1,
                        item.color,
                        item.capacity,
                      )
                    }
                    className="cart__quantity-btn"
                  >
                    +
                  </button>
                </div>
                <p className="cart__item-price">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__summary">
          <p className="cart__summary-total">${totalPrice}</p>
          <p className="cart__summary-text">Total for {itemCount} items</p>
          <button className="cart__checkout" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
      {showNotification && (
        <div className="cart__notification">Thank you for your order!</div>
      )}
    </section>
  );
};
