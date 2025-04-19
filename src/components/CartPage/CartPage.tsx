import React from 'react';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  const cartProducts = products.filter(product =>
    cartItems.some(item => item.productId === product.id.toString()),
  );

  const getQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.productId === productId);

    return cartItem ? cartItem.quantity : 0;
  };

  const totalPrice = getTotalPrice(products);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <div className="cart-container">
          <div className="cart-back">
            <button className="cart-back__button" onClick={() => navigate(-1)}>
              <span className="cart-back__icon">←</span>
              Back
            </button>
          </div>
          <h2 className="cart-title">Cart</h2>
          <div className="cart-empty">
            <p className="cart-empty__message">Your cart is empty</p>
            <Link to="/phones" className="cart-empty__link">
              Go shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <div className="cart-back">
          <button className="cart-back__button" onClick={() => navigate(-1)}>
            <span className="cart-back__icon">←</span>
            Back
          </button>
        </div>
        <h2 className="cart-title">Cart</h2>

        <div className="cart-content">
          <div className="cart-items">
            {cartProducts.map(product => {
              const quantity = getQuantity(product.id.toString());

              return (
                <div className="cart-item" key={product.id}>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(product.id.toString())}
                  >
                    ×
                  </button>

                  <div className="cart-item__image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cart-item__image"
                    />
                  </div>

                  <div className="cart-item__details">
                    <h3 className="cart-item__name">{product.name}</h3>
                  </div>

                  <div className="cart-item__quantity">
                    <button
                      className="cart-item__quantity-btn"
                      onClick={() =>
                        updateQuantity(product.id.toString(), quantity - 1)
                      }
                      disabled={quantity <= 1}
                    >
                      –
                    </button>
                    <span className="cart-item__quantity-value">
                      {quantity}
                    </span>
                    <button
                      className="cart-item__quantity-btn"
                      onClick={() =>
                        updateQuantity(product.id.toString(), quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item__price">${product.price}</div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3 className="cart-summary__title">${totalPrice}</h3>
            <p className="cart-summary__subtitle">
              Total for {totalItems} items
            </p>
            <div className="cart-summary__divider"></div>
            <button className="cart-summary__checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
