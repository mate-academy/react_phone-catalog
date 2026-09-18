import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer/Footer';
import { useCart } from './CartContext';
import './Cart.scss';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice, totalCount } =
    useCart();

  return (
    <>
      <div className="cart-page">
        <div className="cart-page__back" onClick={() => navigate(-1)}>
          <img
            src="./img/VectorBack.svg"
            alt="Back"
            className="cart-page__back-icon"
          />
          <span className="cart-page__back-text">Back</span>
        </div>

        <h1 className="cart-page__title">Cart</h1>

        {cart.length === 0 ? (
          <div className="cart-page__empty">Your cart is empty</div>
        ) : (
          <div className="cart-page__content">
            <div className="cart-page__list">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <button
                    type="button"
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>

                  <img
                    src={`./${item.image}`}
                    alt={item.name}
                    className="cart-item__image"
                  />

                  <span className="cart-item__title">{item.name}</span>

                  <div className="cart-item__quantity">
                    <button
                      type="button"
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="cart-item__qty-count">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="cart-item__qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-item__price">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="cart-page__checkout-block">
              <div className="cart-page__total-price">${totalPrice}</div>
              <div className="cart-page__total-count">
                Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </div>
              <div className="cart-page__divider" />
              <button type="button" className="cart-page__checkout-btn">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer className="footer" />
    </>
  );
};
