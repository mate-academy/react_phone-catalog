import { useContext } from 'react';
import { GlobalContext } from '../../components/Context/GlobalContext';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartItem } from '../../components/CartItem/CartItem';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const { cart } = useContext(GlobalContext);

  const totalSum = cart
    .map(item => item.quantity * item.product.price)
    .reduce((sum, current) => sum + current, 0);

  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <div className="cart-page__info">
          <BackButton />
          <h1 className="cart-page__title">Cart</h1>
        </div>

        {!cart.length && (
          <span className="cart-page__empty">
            Your shopping cart is empty.
          </span>
        )}

        <div className="cart-page__content">
          <ul className="cart-page__list">
            {cart.map(item => (
              <CartItem
                product={item}
                key={item.product.id}
              />
            ))}
          </ul>
        </div>

        {!!cart.length && (
          <div className="cart-page__checkout">
            <div className="cart-page-checkout__info">
              <div className="cart-page__checkout-sum">
                {`$${totalSum}`}
              </div>
              <span className="cart-page__checkout-text">
                {`Total for ${cart.length} item${cart.length > 1 ? 's' : ''}`}
              </span>
            </div>

            <div className="cart-page__checkout-line" />

            <button
              type="button"
              className="cart-page__checkout-button"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
