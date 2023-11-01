import './CartPage.scss';
import { ReactSVG } from 'react-svg';
import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CartContext } from '../../storage/CartContext';

export const CartPage: React.FC = () => {
  const {
    cartItems, removeFromCart, changeQuantity,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce((acc, { quantity, product }) => {
    return acc + product.price * quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((acc, { quantity }) => {
    return acc + quantity;
  }, 0);

  return (
    <div className="cart-page">
      <Breadcrumbs />

      <h1 className="cart-page__title">
        Cart
      </h1>

      {!cartItems.length && (
        <h1>Your cart is empty</h1>
      )}

      {cartItems.length > 0 && (
        <section className="cart-page__section">
          <div className="cart-page__grid">
            <ul className="cart-page__list">
              {cartItems.map(item => {
                const { id, quantity, product } = item;
                const { name, image, price } = product;

                return (
                  <li
                    className="cart-page__item"
                    key={id}
                  >
                    <button
                      type="button"
                      className="cart-page__btn-delete"
                      data-cy="cartDeleteButton"
                      onClick={() => removeFromCart(name)}
                      aria-label="delete"
                    >
                      <ReactSVG
                        src="img/icons/Close.svg"
                      />
                    </button>

                    <div className="cart-page__img-container">
                      <img
                        src={image}
                        className="cart-page__img"
                        alt="product"
                      />
                    </div>

                    <p className="cart-page__item-name">
                      {name}
                    </p>

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
              >
                Checkout
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
