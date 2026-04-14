import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCart.scss';
import { useProducts } from '../context/ProductContext';

export const ProductCart: React.FC = () => {
  const { cart, removeFromCart, changeQuantity, getTotalPrice, getTotalItems } =
    useProducts();

  return (
    <div className="product-cart">
      <div className="product-cart__wrapper">
        <div className="elements__wrapper">
          <Link to="/" className="icon icon--left"></Link>
          <Link to="/" className="elements__nav-text small-text">
            Back
          </Link>
        </div>

        <h1 className="product-cart__title">Cart</h1>

        {cart.length === 0 && (
          <img
            src={`${import.meta.env.BASE_URL}img/cart-is-empty.png`}
            alt="cart is empty"
            className="product-cart__empty"
          />
        )}

        <div className="elements__products product-cart__products">
          {cart.map(f => (
            <div className="product-cart__card" key={f.product.id}>
              <div className="product-cart__card-wrapper">
                <button
                  className="button product-cart__card-close icon icon--close"
                  onClick={() => removeFromCart(f.product.id)}
                ></button>

                <Link
                  to={`/${f.product.category}/${f.product.id}`}
                  className="product-cart__card-image"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <img
                    src={f.product.images[0]}
                    alt="product-image"
                    className="product-cart__card-img"
                  />
                </Link>

                <Link
                  to={`/${f.product.category}/${f.product.id}`}
                  className="product-cart__card-name body-text"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {f.product.name}
                </Link>
              </div>

              <div className="product-cart__card-wrapper">
                <div className="product-cart__card-buttons">
                  <button
                    className="button product-cart__card-button"
                    onClick={() => changeQuantity(f.product.id, f.quantity - 1)}
                  >
                    <div className="icon icon--minus"></div>
                  </button>

                  <div className="button product-cart__card-quantity body-text">
                    {f.quantity}
                  </div>

                  <button
                    className="button product-cart__card-button"
                    onClick={() => changeQuantity(f.product.id, f.quantity + 1)}
                  >
                    <div className="icon icon--plus"></div>
                  </button>
                </div>

                <h3 className="product-cart__card-title">
                  ${f.product.priceDiscount * f.quantity}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="product-cart__order">
            <h2 className="product-cart__total-price">${getTotalPrice()}</h2>
            <div className="product-cart__price-text body-text">
              Total for {getTotalItems()} items
            </div>
            <div className="product-cart__line"></div>
            <button
              className="primary-button product-cart__checkout "
              onClick={() => {
                if (
                  confirm(
                    `Checkout is not implemented yet. Do you want to clear the Cart?`,
                  )
                ) {
                  cart.forEach(f => removeFromCart(f.product.id));
                }
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
