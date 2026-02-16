import { useNavigate } from 'react-router-dom';
import './Cart.scss';
import { useCart } from '../../shared/context/Cart/CartContext';
import { useState } from 'react';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const totalItemsPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return <p className="empty-page">Your cart is empty</p>;
  }

  return (
    <section className="cart grid">
      <button onClick={() => navigate(-1)} className="go-back cart-go-back">
        <img src="/img/chevron-right.svg" alt="" />
        Back
      </button>

      <h1 className="product-title">Cart</h1>
      <section className="added-items">
        <div className="added-items-wrapper">
          {cart.map(item => (
            <div key={item.id} className="added-item">
              <div className="added-item-left">
                <div className="added-item-left-info">
                  <button
                    className="added-item-close"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <img src="/img/cart/Close.svg" alt="" />
                  </button>
                  <img
                    src={`${item.image}`}
                    className="added-item-image"
                    alt={`${item.name}`}
                  />
                  <h4>{item.name}</h4>
                </div>
              </div>

              <div className="added-item-right">
                <div className="added-item-right-action-counter">
                  <button
                    className="added-item-right-action-counter-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <img
                      src="/img/cart/Minus.svg"
                      className="added-item-right-action-counter-img"
                      alt=""
                    />
                  </button>
                  <span className="added-item-right-action-counter-product_counter">
                    {item.quantity}
                  </span>
                  <button
                    className="added-item-right-action-counter-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <img
                      src="/img/cart/Plus.svg"
                      className="added-item-right-action-counter-img"
                      alt=""
                    />
                  </button>
                </div>
                <span className="added-item-right-price">
                  ${item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="added-items-total">
          <p>
            {' '}
            ${totalItemsPrice}
            <span>Total for {cart.length} items</span>
          </p>
          <button
            className="added-items-total-btn card-add"
            onClick={() => setIsOpen(true)}
          >
            Checkout
          </button>
        </div>
      </section>
      {isOpen && (
        <>
          <section
            className="modal-backgorund"
            onClick={() => setIsOpen(false)}
          ></section>
          <section className="modal-checkout">
            <button
              className="modal-checkout-close"
              onClick={() => setIsOpen(false)}
            >
              <img src="/img/cart/Close.svg" alt="" />
            </button>
            <p className="modal-checkout-content-text">
              Checkout is not implemented yet. <br /> Do you want to clear the
              Cart?
            </p>
            <button
              className="modal-checkout-confirm-btn card-add"
              onClick={() => clearCart()}
            >
              Confirm
            </button>
          </section>
        </>
      )}
    </section>
  );
};
