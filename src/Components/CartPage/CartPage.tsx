import { Link } from 'react-router-dom';
import './CartPage.scss';
import { useState } from 'react';
import { CartProduct } from './CartProduct';
import { useAppSelector } from '../../app/hooks';

export const CartPage = () => {
  const cartProducts = useAppSelector(state => state.cartProducts.items);

  const productPrice = cartProducts.reduce(
    (total, item) => total + (item.quantity * item.price), 0,
  );

  const [hasError, setHasError] = useState(false);

  return (
    <div className="cart">
      <div>
        <Link
          to="/"
          className="cart__link"
        >
          Back
        </Link>
        <h1 className="cart__title">Cart</h1>

        <div className="cart-container">
          {cartProducts.length ? (
            cartProducts.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))
          ) : (
            <h1>Your cart is empty</h1>
          )}
        </div>
      </div>
      <div className="cart__total-container">
        <h1 className="cart__total-price-amount">
          {`$${productPrice}`}
        </h1>
        <h2 className="cart__total-carts">
          {cartProducts.length === 1
            ? `Total for ${cartProducts.length} item`
            : `Total for ${cartProducts.length} items`}
        </h2>
        <div className="cart__button-checkout-container">
          <button
            type="button"
            className="cart__button-checkout"
            onClick={() => setHasError(true)}
          >
            Checkout
          </button>
        </div>
        {hasError
          && (
            <div className="cart__error">
              <button
                type="button"
                aria-label="close"
                className="cart__close cart__error__close"
                onClick={() => setHasError(false)}
              />
              <h2 className="cart__error__title">
                We are sorry, but this feature is not implemented yet
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};
