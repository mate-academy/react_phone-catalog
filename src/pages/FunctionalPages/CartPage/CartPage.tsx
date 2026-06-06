import { useCart } from '../../../Functional/CartContext/CartContext';
import './CartPage.scss';
import { getBaseUrl } from '../../../utils';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <section className="cart section">
        <div className="cart__back" onClick={() => window.history.back()}>
          <img
            src={`${getBaseUrl()}icons/arrow-left-breadcrumb.svg`}
            alt="back"
            className="cart__back-arrow"
          />
          <span>Back</span>
        </div>
        <h1 className="cart__title">Cart</h1>
        <p className="cart__empty">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="cart section">
      <div className="cart__back" onClick={() => window.history.back()}>
        <img
          src={`${getBaseUrl()}icons/arrow-left-breadcrumb.svg`}
          alt="back"
          className="cart__back-arrow"
        />
        <span>Back</span>
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
                className="cart__item-close"
                onClick={() => removeFromCart(item.id)}
              >
                <img
                  src={`${getBaseUrl()}icons/close.svg`}
                  alt="close"
                />
              </button>
              <img
                src={item.image}
                alt={item.name}
                className="cart__item-image"
              />
              <p className="cart__item-name">{item.name}</p>
              <div className="cart__item-quantity">
                <button
                  className="cart__item-qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="cart__item-qty-value">{item.quantity}</span>
                <button
                  className="cart__item-qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <p className="cart__item-price">${item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="cart__summary">
          <p className="cart__total">${totalPrice}</p>
          <p className="cart__total-label">
            Total for {cart.reduce((sum, item) => sum + item.quantity, 0)} items
          </p>
          <div className="cart__divider" />
          <button className="cart__checkout">Checkout</button>
        </div>
      </div>
    </section>
  );
};