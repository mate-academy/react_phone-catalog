import { useCart } from '../../../Functional/CartContext/CartContext';
import './CartPage.scss';
import { Link } from 'react-router-dom';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <section className="cart section">
        <Link to="/" className="cart__back">
          {'< Back'}
        </Link>
        <h1 className="cart__title">Cart</h1>
        <p className="cart__empty">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="cart section">
      <Link to="/" className="cart__back">
        {'< Back'}
      </Link>
      <h1 className="cart__title">Cart</h1>
      <div className="cart__content">
        <div className="cart__items">
          {cart.map(item => (
            <div
              key={`${item.id}-${item.color}-${item.capacity}`}
              className="cart__item"
            >
              <button
                className="cart__remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>

              <img
                src={
                  item.image.startsWith('/') ? item.image.slice(1) : item.image
                }
                alt={item.name}
                className="cart__item-image"
              />

              <div className="cart__item-info">
                <h3 className="cart__item-name">{item.name}</h3>

                <div className="cart__item-controls">
                  <div className="cart__quantity">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="cart__item-price">${item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart__summary">
          <h2 className="cart__total">${totalPrice}</h2>
          <p className="cart__total-label">
            Total for {cart.reduce((sum, item) => sum + item.quantity, 0)} items
          </p>

          <hr className="cart__divider" />

          <button
            className="cart__checkout"
            onClick={() => alert('Checkout successful!')}
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};
