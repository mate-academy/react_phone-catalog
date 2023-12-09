import './CartPage.scss';
import React, { useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CartContext } from '../../storage/CartContext';
import { EmptyCart } from '../../components/EmptyCart';
import {
  NotificationContext, NotificationStatus,
} from '../../storage/NotificationContext';

export const CartPage: React.FC = memo(() => {
  const {
    cartItems, changeQuantity, handleCart,
  } = useContext(CartContext);
  const { setNotification } = useContext(NotificationContext);

  const totalPrice = cartItems.reduce((acc, { quantity, product }) => {
    return acc + product.price * quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((acc, { quantity }) => {
    return acc + quantity;
  }, 0);

  const handleCheckout = () => {
    setNotification({
      message: 'We are sorry, but this feature is not implemented yet',
      color: NotificationStatus.Warning,
    });
  };

  return (
    <div className="cart-page">
      <Breadcrumbs />

      <h1 className="cart-page__title">
        Cart
      </h1>

      {!cartItems.length && (
        <EmptyCart />
      )}

      {cartItems.length > 0 && (
        <section className="cart-page__section">
          <div className="cart-page__grid">
            <ul className="cart-page__list">
              {cartItems.map(item => {
                const { id, quantity, product } = item;
                const {
                  name, image, price, category, itemId,
                } = product;

                return (
                  <li
                    className="cart-page__item"
                    key={id}
                  >
                    <button
                      type="button"
                      className="cart-page__btn-delete"
                      data-cy="cartDeleteButton"
                      onClick={() => handleCart(product)}
                      aria-label="delete"
                    >
                      <ReactSVG
                        src="img/icons/Close.svg"
                      />
                    </button>

                    <Link
                      to={`/${category}/${itemId}`}
                      className="cart-page__img-link"
                    >
                      <div className="cart-page__img-container">
                        <img
                          src={image}
                          alt={name}
                          className="cart-page__img"
                        />
                      </div>
                    </Link>

                    <Link
                      to={`/${category}/${itemId}`}
                      className="cart-page__item-link"
                    >
                      <p className="cart-page__item-name">
                        {name}
                      </p>
                    </Link>

                    <div className="cart-page__quantity-buttons">
                      <button
                        className="cart-page__quantity-button"
                        onClick={() => changeQuantity(id, quantity - 1)}
                        type="button"
                        data-cy="minus"
                        disabled={quantity === 1}
                      >
                        -
                      </button>

                      <p className="cart-page__quantity">
                        {quantity}
                      </p>

                      <button
                        className="cart-page__quantity-button"
                        onClick={() => changeQuantity(id, quantity + 1)}
                        type="button"
                        data-cy="minus"
                      >
                        +
                      </button>
                    </div>

                    <h2 className="cart-page__item-price">
                      {`$${price}`}
                    </h2>
                  </li>
                );
              })}
            </ul>

            <div className="cart-page__total">
              <h1 className="cart-page__total-price">
                {`$${totalPrice}`}
              </h1>

              <p
                className="cart-page__total-quantity"
                data-cy="productQauntity"
              >
                {`Total for ${totalQuantity} items`}
              </p>

              <button
                className="cart-page__checkout-button"
                type="button"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
});
