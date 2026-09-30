import { CartItem } from '../Card/CardItem/CartItem';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';

export const Cart = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const cartQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="cart">
      <div className="cart__content">
        <div className="cart__back">
          <button
            type="button"
            className="cart__back"
            onClick={() => navigate(-1)}
          >
            <span>&lsaquo;</span>
            <span>Back</span>
          </button>
        </div>

        <h2 className="cart__title">Cart</h2>
        <div className="cart__main">
          <div className="cart__list">
            {cart.length > 0 ? (
              cart.map(item => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  quantity={item.quantity}
                />
              ))
            ) : (
              <p className="cart__empty">
                Your cart is empty
              </p>
            )}
          </div>
          {cart.length > 0 ? (
            <div className="cart__checkout">
              <h3 className="cart__checkout-total">
                ${cartTotal}
              </h3>
              <p className="cart__checkout-count">
                Total for {cartQuantity} items
              </p>
              <hr className="cart__checkout-divider" />
              {cart.length > 0 && (
                <button
                  type="button"
                  className="cart__checkout-btn"
                  onClick={() => {
                    window.confirm(
                      'Checkout is not implemented yet',
                    );
                    clearCart();
                  }}
                >
                  Checkout
                </button>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
