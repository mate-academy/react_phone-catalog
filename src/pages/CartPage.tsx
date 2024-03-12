import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';
import {
  getPluralOrSingle,
  getProductPriceWithDiscount,
} from '../helpers/ProductMethods';
import { CartCard } from '../components/CartCard';

type Props = {
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
};

export const CartPage: React.FC<Props> = ({ setCartItems, cartItems }) => {
  const [showMessage, setShowMessage] = useState(false);

  const totalSum = cartItems.reduce((acc, item) => {
    if (item.product && item.product.discount) {
      return acc + getProductPriceWithDiscount(item.product) * item.quantity;
    }

    return acc + (item.product?.price * item.quantity || 0);
  }, 0);

  const totoalQuantity = cartItems.reduce(
    (acc, item) => item.quantity + acc,
    0,
  );
  const handleCheckout = () => {
    setShowMessage(true);
  };

  return (
    <div className="cart-page">
      <div className="page-path-icons cart-page__back">
        <p className="icon icon--slider icon--left" />
        <NavLink
          to=".."
          className="page-path-icons__location page-path-icons__back"
        >
          Back
        </NavLink>
      </div>

      <h1 className="cart-page__title">Cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart-page__content">
          <div className="cart-page__list">
            {cartItems.map((cartItem) => (
              <CartCard
                cartItem={cartItem}
                setCartItems={setCartItems}
                cartItems={cartItems}
              />
            ))}
          </div>

          <div className="cart-page__summ">
            <div className="price price--big cart-page__price">{`$${totalSum}`}</div>
            <p className="cart-page__total">
              {`total for ${totoalQuantity} ${getPluralOrSingle(
                'item',
                cartItems.length,
              )}`}
            </p>
            <button
              className="control-button control-button--width cart-page__button"
              type="button"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            {showMessage && (
              <p>We are sorry, but this feature is not implemented yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};
