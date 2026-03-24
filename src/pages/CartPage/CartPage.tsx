import { useCart } from '../../components/CartContext/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.scss';

const CartPage = () => {
  const { cart, removeFromCart, changeQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="back-button" onClick={() => navigate(-1)}>
        <img
          src="/img/Arrow_Left.svg"
          alt="Arrow"
          className="breadcrumbs__arrow"
        />
        Back
      </div>
      <div className="cart-title">Cart</div>
      <div className="cart-container">
        {/* LEFT - items */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-card">
              {/* Кнопка хрестика */}
              <button
                className="remove"
                onClick={() => removeFromCart(item.id)}
              >
                <img
                  src="/img/Close.svg"
                  alt="Remove"
                  className="remove-icon"
                />
              </button>

              {/* Зображення */}
              <img src={item.image} alt={item.name} />

              {/* Назва продукту */}
              <div className="product-name">{item.name}</div>

              {/* Правий блок з кількістю та ціною */}
              <div className="right-side">
                <div className="quantity">
                  <button
                    className="minus"
                    onClick={() => changeQuantity(item.id, -1)}
                  >
                    <img
                      src="/img/Minus.svg"
                      alt="Minus"
                      className="minus-icon"
                    />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="plus"
                    onClick={() => changeQuantity(item.id, 1)}
                  >
                    <img src="/img/Plus.svg" alt="Plus" className="plus-icon" />
                  </button>
                </div>

                <div className="price">${item.price * item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - summary */}
        <div className="cart-summary">
          <div className="total-price">${total}</div>
          <div className="summary-text">
            Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
          </div>
          <hr className="divider" />
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
